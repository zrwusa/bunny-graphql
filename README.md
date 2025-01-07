
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
## Deployment


```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

## Support


## Stay in touch


## License

