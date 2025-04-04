import { BadRequestException, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchProductDto } from './dto/search-product.dto';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async createProduct(product: SearchProductDto) {
    return this.elasticsearchService.create({
      index: 'products',
      id: product.id,
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
    if (!query || typeof query !== 'string') {
      throw new BadRequestException('Query parameter is required and must be a string');
    }

    const response = await this.elasticsearchService.search<SearchProductDto>({
      index: 'products',
      query: {
        multi_match: {
          query,
          fields: [
            'name^3',
            'description.overview.model^3', // Nested object search `model`
            'description.overview.description^2',
            'category',
            'brand',
          ],
        },
      },
    });

    // Make sure `hits.hits` exists and avoid `.map()` throwing errors
    const hits = response.hits?.hits || [];

    // // Make the returned data more in line with business needs, remove the _id and _source structures, and merge them into a simpler JSON
    // return hits.map((hit) => ({
    //   id: hit._id,
    //   ...hit._source,
    // }));

    // Make the returned data more in line with business needs, remove the _id and _source structures, and merge them into a simpler JSON
    return hits.map((hit) => hit._id);
  }

  async bulkIndexProducts(products: SearchProductDto[]) {
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
}
