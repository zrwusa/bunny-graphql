import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './user/user.module';
import { User } from './entities/user.entity';
import { UserSetting } from './entities/user-setting.entity';
import { Product } from './entities/product.entity';
import { ProductsModule } from './product/product.module';
import { PostModule } from './post/post.module';
import { Post } from './entities/post.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule globally available throughout the application
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'generated/schema.gql',
      debug: true,
      playground: true,
      introspection: true,
      formatError: (error) => {
        console.error('GraphQL Error:', error);
        return error;
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        // Transform non-injectable objects into providers using useValue and useFactory
        return {
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: +configService.get('POSTGRES_PORT'),
          username: configService.get('POSTGRES_USERNAME'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DATABASE'),
          entities: [User, UserSetting, Product, Post],
          synchronize: true, // For development only, production environments should use migrations
          logging: ['query', 'error'], //Turn on SQL query and error logging
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    ProductsModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
