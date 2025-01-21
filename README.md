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

### Get users

```graphql
query {
    users {
        id
        username
        provider
        settings {
            userId
            receiveEmails
            receiveNotifications
        }
        posts {
            id
            content
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
        brand
        description
    }
}

```

### Create post

```graphql
mutation {
    createPost(
        createPostInput: {
            userId: "136964796021366197"
            title: "title 645"
            content: "content 544"
            price: 20
            image: "https://image.google.com/a.png"
        }
    ) {
        id
        image
        title
        content
    }
}

```

### Get posts

```graphql
query {
    posts {
        id
        image
        user {
            username
            provider
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

## Support

## Stay in touch

## License

