import { BadRequestException, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchProductDto } from './dto/search-product.dto';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async createProduct(product: SearchProductDto) {
    const { id } = product;
    return this.elasticsearchService.create({
      index: 'products',
      id,
      document: product,
    });
  }

  async updateProduct(product: SearchProductDto) {
    return this.elasticsearchService.update({
      index: 'products',
      id: product.id,
      doc: product, // Update only changed fields
    });
  }

  async deleteProduct(id: string) {
    return this.elasticsearchService.delete({
      index: 'products',
      id,
    });
  }

  async searchProducts(query: string) {
    const isEmptyQuery = !query?.trim();

    const response = await this.elasticsearchService.search<SearchProductDto>({
      index: 'products',
      size: 20, // Restrictions to return up to 20 records
      query: isEmptyQuery
        ? { match_all: {} } // If query is empty, match all
        : {
            multi_match: {
              query,
              fields: [
                'name^3',
                'description.overview.model^3',
                'description.overview.description^2',
                'category',
                'brand',
              ],
              operator: 'and', // All words must match
            },
          },
      sort: isEmptyQuery
        ? [{ id: { order: 'desc' } }] // When empty strings are created in reverse order (assuming you have this field)
        : undefined,
    });

    return response.hits?.hits || [];
  }

  async bulkIndexProducts(products: SearchProductDto[]) {
    const index = 'products';

    const exists = await this.elasticsearchService.indices.exists({ index });

    if (exists) {
      await this.elasticsearchService.indices.delete({ index });
      console.log(`Deleted index: ${index}`);
    }

    await this.elasticsearchService.indices.create({
      index,
      mappings: {
        properties: {
          id: { type: 'keyword' },
          name: { type: 'text' },
          category: { type: 'keyword' },
          brand: { type: 'keyword' },
          variants: { type: 'keyword' },
          description: {
            type: 'object',
            properties: {
              overview: {
                type: 'object',
                properties: {
                  model: { type: 'text' },
                  description: { type: 'text' },
                },
              },
            },
          },
          suggest: {
            type: 'completion',
          },
        },
      },
    });

    console.log(`Created index '${index}' with custom mappings`);

    if (!products || products.length === 0) {
      throw new BadRequestException('Products array cannot be empty.');
    }

    // bulk() allows you to perform multiple operations (index, update, delete) in the same request.
    // Metadata needs to be operated to tell it "how to deal with the data in this next line". The data format is as follows
    // [
    //   { index: { _index: 'products', _id: '1' } },
    //   { id: '1', name: 'Product 1' },
    //   { update: { _index: 'products', _id: '2' } },
    //   { doc: { name: 'Updated Product 2' } },
    //   { delete: { _index: 'products', _id: '3' } }
    // ]
    // , so flatMap is needed to traverse
    const operations = products.flatMap((product) => [
      { index: { _index: 'products', _id: product.id } },
      product,
    ]);

    return this.elasticsearchService.bulk({ operations });
  }

  async suggestProducts(input: string) {
    const isShort = input.trim().split(/\s+/).length <= 2;

    if (isShort) {
      // Prefix Association (suitable for fast input)
      const result = await this.elasticsearchService.search<SearchProductDto>({
        index: 'products',
        suggest: {
          product_suggest: {
            prefix: input,
            completion: {
              field: 'suggest',
              fuzzy: {
                fuzziness: 2,
                min_length: 3,
                prefix_length: 1,
                transpositions: true,
              },
              size: 10,
            },
          },
        },
      });

      const suggestions = result.suggest?.product_suggest?.[0]?.options ?? [];
      // If it is not an array, it can be wrapped into an array
      return Array.isArray(suggestions) ? suggestions : [suggestions];
    } else {
      // Intermediate word matching (for full description)
      const result = await this.elasticsearchService.search<SearchProductDto>({
        index: 'products',
        size: 10,
        query: {
          bool: {
            should: [
              {
                match_phrase_prefix: {
                  name: {
                    query: input,
                    boost: 3,
                  },
                },
              },
              {
                match_phrase: {
                  name: {
                    query: input,
                    boost: 2,
                  },
                },
              },
              {
                multi_match: {
                  query: input,
                  fields: ['name^3', 'description.overview.description^2', 'brand', 'category'],
                  type: 'best_fields',
                },
              },
            ],
          },
        },
        _source: ['name'],
      });

      return result.hits?.hits;
    }
  }
}
