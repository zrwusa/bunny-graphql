## Description

[//]: # ([Nest]&#40;https://github.com/nestjs/nest&#41; framework TypeScript starter repository.)

## Project setup

```bash
$ npm install
```

### .env

```text
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=YOUR_DATABASE_PASSWORD
POSTGRES_DATABASE=YOUR_DATABASE_NAME
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## WebStorm Debugging

```text
Node interpreter: versions/node/v22.10.0/bin/node) 22.10.0
TypeScript loader: None
Node parameters: 
Working directory: ~/projects/bunny-graphql
File: node_modules/.bin/nest
Application parameters: start --debug --watch
Environment variables: Environment variables
```

## Graphql queries and mutations

### Get users

```graphql
query {
    users {
        id
        username
        provider
        preference {
            receiveEmails
            receiveNotifications
        }
        profile {
            bio
            gender
        }
        addresses {
            addressLine1
            postalCode
            addressLine2
            city
            country
        }
        paymentMethods {
            paymentType
        }
        orders {
            id
        }
        reviews {
            id
        }
    }
}
```

### Create user

```graphql
mutation {
    createUser(
        createUserInput: {
            username: "Maf"
            email: "xxx@gmail.com"
            password: "Zdd@fafdas"
        }
    ) {
        username
        email
        id
    }
}


```

### Get user by id

```graphql
query {
    user(id: "905081365494623249") {
        id
        email
        username
    }
}

```

### Create user settings

```graphql
mutation {
    createUserSettings(
        createUserSettingsInput: {
            userId: "905081365494623249"
            receiveEmails: true
            receiveNotifications: false
        }
    ) {
        id
        userId
    }
}

```

### Get products

```graphql
query {
    products {
        id
        name
        description
        brand {
            id
            name
        }
        category {
            id
            name
        }
        variants {
            id
            sku
            size
            color
            reviews {
                rating
                comment
            }
        }
        images {
            url
        }
        reviews {
            rating
            comment
        }
    }
}

```

### Create product

```graphql
mutation {
    createProduct(
        createProductInput: {
            name: "Megamax"
            brandId: "25696653144189"
            price: 100
            description: "Ridgid Megamax Rotary Hammer Head"
        }
    ) {
        id
        name
    }
}
```



### Get orders

```graphql
query {
    orders(filterOrderInput: { page: 1, pageSize: 10 }) {
        id
        status
        shippingStatus
        paymentStatus
        paymentMethod
        user {
            id
            username
        }
        items {
            price
            quantity
            variant {
                id
            }
        }
    }
}

```

### Enum

```sql
SELECT n.nspname AS schema_name,
       t.typname AS enum_name,
       e.enumlabel AS enum_value
FROM pg_type t
JOIN pg_enum e ON t.oid = e.enumtypid
JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
WHERE n.nspname = 'public';
```

## Deployment

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than
managing infrastructure.

## Resources
<table class="waffle" cellspacing="0" cellpadding="0">
    <thead>
    <tr>
      <th class="row-header freezebar-origin-ltr"></th>
      <th id="0C0" style="width:100px;" class="column-headers-background">A</th>
      <th id="0C1" style="width:100px;" class="column-headers-background">B</th>
      <th id="0C2" style="width:100px;" class="column-headers-background">C</th>
    </tr>
    </thead>
    <tbody>
    <tr style="height: 20px">
      <th id="0R0" style="height: 20px;" class="row-headers-background">
        <div class="row-header-wrapper" style="line-height: 20px">1</div>
      </th>
      <td class="s0 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:115px;left:-19px">Order Process Step</div>
      </td>
      <td class="s1 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:99px;left:-3px">Responsible Microservice</div>
      </td>
      <td class="s2" dir="ltr">Description</td>
    </tr>
    <tr style="height: 20px">
      <th id="0R1" style="height: 20px;" class="row-headers-background">
        <div class="row-header-wrapper" style="line-height: 20px">2</div>
      </th>
      <td class="s3 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:97px;left:-1px">1. Browsing &amp; Product Selection</div>
      </td>
      <td class="s3" dir="ltr">Product Service</td>
      <td class="s4 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:298px;left:-1px">Provides product details, search, and filtering.
        </div>
      </td>
    </tr>
    <tr style="height: 20px">
      <th id="0R2" style="height: 20px;" class="row-headers-background">
        <div class="row-header-wrapper" style="line-height: 20px">3</div>
      </th>
      <td></td>
      <td class="s3" dir="ltr">Inventory Service</td>
      <td class="s4 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:298px;left:-1px">Ensures stock availability is displayed.</div>
      </td>
    </tr>
    <tr style="height: 20px">
      <th id="0R3" style="height: 20px;" class="row-headers-background">
        <div class="row-header-wrapper" style="line-height: 20px">4</div>
      </th>
      <td class="s3" dir="ltr">2. Adding to Cart</td>
      <td class="s3" dir="ltr">Cart Service</td>
      <td class="s4 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:298px;left:-1px">Manages the shopping cart and item quantities.</div>
      </td>
    </tr>
    <tr style="height: 20px">
      <th id="0R4" style="height: 20px;" class="row-headers-background">
        <div class="row-header-wrapper" style="line-height: 20px">5</div>
      </th>
      <td></td>
      <td class="s3" dir="ltr">Inventory Service</td>
      <td class="s4 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:298px;left:-1px">Reserves stock for items in the cart (optional).
        </div>
      </td>
    </tr>
    <tr style="height: 20px">
      <th id="0R5" style="height: 20px;" class="row-headers-background">
        <div class="row-header-wrapper" style="line-height: 20px">6</div>
      </th>
      <td class="s3 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:97px;left:-1px">3. Checkout Process</div>
      </td>
      <td class="s3" dir="ltr">Order Service</td>
      <td class="s4 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:298px;left:-1px">Creates a new order with selected items.</div>
      </td>
    </tr>
    <tr style="height: 20px">
      <th id="0R6" style="height: 20px;" class="row-headers-background">
        <div class="row-header-wrapper" style="line-height: 20px">7</div>
      </th>
      <td></td>
      <td class="s3" dir="ltr">User Service</td>
      <td class="s4 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:398px;left:-1px">Retrieves user address and payment preferences.</div>
      </td>
    </tr>
    <tr style="height: 20px">
      <th id="0R7" style="height: 20px;" class="row-headers-background">
        <div class="row-header-wrapper" style="line-height: 20px">8</div>
      </th>
      <td class="s3 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:97px;left:-1px">4. Order Placement</div>
      </td>
      <td class="s3" dir="ltr">Order Service</td>
      <td class="s4 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:298px;left:-1px">Finalizes order and updates order status.</div>
      </td>
    </tr>
    <tr style="height: 20px">
      <th id="0R8" style="height: 20px;" class="row-headers-background">
        <div class="row-header-wrapper" style="line-height: 20px">9</div>
      </th>
      <td class="s3 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:97px;left:-1px">5. Payment Processing</div>
      </td>
      <td class="s3" dir="ltr">Payment Service</td>
      <td class="s4 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:298px;left:-1px">Handles payment transactions and validations.</div>
      </td>
    </tr>
    <tr style="height: 20px">
      <th id="0R9" style="height: 20px;" class="row-headers-background">
        <div class="row-header-wrapper" style="line-height: 20px">10</div>
      </th>
      <td></td>
      <td class="s3" dir="ltr">Order Service</td>
      <td class="s4 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:398px;left:-1px">Updates order status to &quot;Paid&quot; after
          successful payment.
        </div>
      </td>
    </tr>
    <tr style="height: 20px">
      <th id="0R10" style="height: 20px;" class="row-headers-background">
        <div class="row-header-wrapper" style="line-height: 20px">11</div>
      </th>
      <td class="s3 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:97px;left:-1px">6. Order Confirmation</div>
      </td>
      <td class="s3 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:97px;left:-1px">Notification Service</div>
      </td>
      <td class="s4 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:298px;left:-1px">Sends order confirmation email/SMS.</div>
      </td>
    </tr>
    <tr style="height: 20px">
      <th id="0R11" style="height: 20px;" class="row-headers-background">
        <div class="row-header-wrapper" style="line-height: 20px">12</div>
      </th>
      <td></td>
      <td class="s3" dir="ltr">Order Service</td>
      <td class="s4 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:198px;left:-1px">Stores order details for tracking.</div>
      </td>
    </tr>
    <tr style="height: 20px">
      <th id="0R12" style="height: 20px;" class="row-headers-background">
        <div class="row-header-wrapper" style="line-height: 20px">13</div>
      </th>
      <td class="s3 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:97px;left:-1px">7. Order Fulfillment</div>
      </td>
      <td class="s3" dir="ltr">Inventory Service</td>
      <td class="s4 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:298px;left:-1px">Updates stock levels after order confirmation.</div>
      </td>
    </tr>
    <tr style="height: 20px">
      <th id="0R13" style="height: 20px;" class="row-headers-background">
        <div class="row-header-wrapper" style="line-height: 20px">14</div>
      </th>
      <td></td>
      <td class="s3" dir="ltr">Shipping Service</td>
      <td class="s4 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:298px;left:-1px">Prepares shipment details and carrier selection.
        </div>
      </td>
    </tr>
    <tr style="height: 20px">
      <th id="0R14" style="height: 20px;" class="row-headers-background">
        <div class="row-header-wrapper" style="line-height: 20px">15</div>
      </th>
      <td class="s3 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:97px;left:-1px">8. Shipping &amp; Tracking</div>
      </td>
      <td class="s3" dir="ltr">Shipping Service</td>
      <td class="s4 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:398px;left:-1px">Manages order dispatch, tracking, and delivery
          updates.
        </div>
      </td>
    </tr>
    <tr style="height: 20px">
      <th id="0R15" style="height: 20px;" class="row-headers-background">
        <div class="row-header-wrapper" style="line-height: 20px">16</div>
      </th>
      <td></td>
      <td class="s3 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:97px;left:-1px">Notification Service</div>
      </td>
      <td class="s4 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:298px;left:-1px">Sends shipping updates and tracking info.</div>
      </td>
    </tr>
    <tr style="height: 20px">
      <th id="0R16" style="height: 20px;" class="row-headers-background">
        <div class="row-header-wrapper" style="line-height: 20px">17</div>
      </th>
      <td class="s3" dir="ltr">9. Order Delivery</td>
      <td class="s3" dir="ltr">Shipping Service</td>
      <td class="s4 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:298px;left:-1px">Marks order as &quot;Delivered&quot; upon receipt.
        </div>
      </td>
    </tr>
    <tr style="height: 20px">
      <th id="0R17" style="height: 20px;" class="row-headers-background">
        <div class="row-header-wrapper" style="line-height: 20px">18</div>
      </th>
      <td></td>
      <td class="s3" dir="ltr">Order Service</td>
      <td class="s4 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:298px;left:-1px">Updates order status to &quot;Completed&quot;.</div>
      </td>
    </tr>
    <tr style="height: 20px">
      <th id="0R18" style="height: 20px;" class="row-headers-background">
        <div class="row-header-wrapper" style="line-height: 20px">19</div>
      </th>
      <td class="s3 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:97px;left:-1px">10. Post-Order Actions</div>
      </td>
      <td class="s3 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:97px;left:-1px">Review &amp; Feedback Service</div>
      </td>
      <td class="s4 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:298px;left:-1px">Collects user feedback and ratings.</div>
      </td>
    </tr>
    <tr style="height: 20px">
      <th id="0R19" style="height: 20px;" class="row-headers-background">
        <div class="row-header-wrapper" style="line-height: 20px">20</div>
      </th>
      <td></td>
      <td class="s3 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:97px;left:-1px">Return &amp; Refund Service</div>
      </td>
      <td class="s4 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:298px;left:-1px">Handles return requests and refund processing.</div>
      </td>
    </tr>
    <tr style="height: 20px">
      <th id="0R20" style="height: 20px;" class="row-headers-background">
        <div class="row-header-wrapper" style="line-height: 20px">21</div>
      </th>
      <td></td>
      <td class="s3" dir="ltr">Payment Service</td>
      <td class="s4 softmerge" dir="ltr">
        <div class="softmerge-inner" style="width:398px;left:-1px">Processes refunds and adjusts payments if needed.
        </div>
      </td>
    </tr>
    </tbody>
  </table>

## Support

## Stay in touch

## License

