import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchProductDto } from './dto/search-product.dto';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  // Index (new/updated) products
  async indexProduct(product: SearchProductDto) {
    return this.elasticsearchService.index({
      index: 'products',
      id: product.id,
      document: product,
    });
  }

  // Delete the product
  async deleteProductIndex(id: string) {
    return this.elasticsearchService.delete({
      index: 'products',
      id,
    });
  }

  async searchProducts(query: any) {
    if (!query || typeof query !== 'string') {
      throw new Error('Query parameter is required and must be a string');
    }

    const response = await this.elasticsearchService.search({
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

    return hits.map((hit) => ({
      id: hit._id,
      ...(hit._source as Record<string, any>),
    }));
  }

  async bulkIndexProducts(products: SearchProductDto[]) {
    if (!products || products.length === 0) {
      throw new Error('Products array cannot be empty.');
    }

    const body = products.flatMap((product) => [
      { index: { _index: 'products', _id: product.id } },
      product, // Deposit directly `SearchProductDto`
    ]);

    return this.elasticsearchService.bulk({ body });
  }
}
