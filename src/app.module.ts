import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { UserSetting } from './user/entities/user-setting.entity';
import { Product } from './product/entities/product.entity';
import { ProductModule } from './product/product.module';
import { PostModule } from './post/post.module';
import { Post } from './post/entities/post.entity';
import { OrderModule } from './order/order.module';
import { Order } from './order/entities/order.entity';
import { OrderItem } from './order/entities/order-item.entity';
import { PaymentModule } from './payment/payment.module';
import { InventoryRecord } from './product/entities/inventory-record.entity';
import { Payment } from './payment/entities/payment.entity';
import { AppResolver } from './app.resolver';
import { UserProfile } from './user/entities/user-profile.entity';
import { UserAddress } from './user/entities/user-address.entity';
import { UserPaymentMethod } from './user/entities/user-payment-method.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule globally available throughout the application
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/generated/schema.gql',
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
          entities: [
            User,
            UserSetting,
            UserProfile,
            UserAddress,
            UserPaymentMethod,
            Product,
            Post,
            Order,
            OrderItem,
            InventoryRecord,
            Payment,
          ],
          migrations: ['src/migrations/*{.ts,.js}'],
          synchronize: true, // For development only, production environments should use migrations
          logging: ['query', 'error'], //Turn on SQL query and error logging
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    ProductModule,
    PostModule,
    OrderModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}
