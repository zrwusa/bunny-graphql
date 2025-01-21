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
    getUsers {
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
        createUserDto: {
            username: "xxx"
            password: "Xxx123"
            email: "xxx@gmail.com"
        }
    ) {
        username
        id
        settings {
            userId
            receiveEmails
        }
    }
}

```

### Get user by id

```graphql
query {
    getUserById(id: "905081365494623249") {
        username
        oauthId
        email
    }
}
```

### Create user settings

```graphql
mutation {
    createUserSettings(
        createUserSettingsDto: { userId: "461131055522593811", receiveEmails: true }
    ) {
        id
        userId
        receiveEmails
        receiveNotifications
    }
}
```

### Get products

```graphql
query {
    getProducts {
        name,
        price,
        description
    }
}
```

### Create post

```graphql
mutation {
    createPost(
        createPostDto: {
            userId: "136964796021366197"
            title: "title 9"
            content: "content 9"
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
    getPosts {
        id
        title
        content
        price
        user {
            id
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

