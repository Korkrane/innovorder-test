# Technical test - innovorder

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## Routes
The following table shows an overview of the existing API routes:

- GET     `users`	            get all Users
- GET     `users/:id`         get User by id
- POST    `users`             add new User
- POST    `users/login`       login to get acces to `/GET users` and `/GET products:code`
- PUT     `users/:id`       update User by id
- DELETE  `users/:id`       remove User by id

- GET     `products/:code`    get product by it's code

## Project setup
```
git clone https://github.com/Korkrane/innovorder-test.git
cd innovorder-test
./run.sh
```

## Test the API

Once the application is running, you can access and test the API with Swagger on `http://localhost:3000/api`


### Usage

  To get acces to `/GET users` and `/GET products:code` you first have to create an account and logs you in with it. After calling `users/login`, it will returns you a token that you have to copy/paste via the lock icon located on the right on the protected routes in Swagger.