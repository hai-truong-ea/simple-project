# A Simple Project in Typescript

## Project Requirements
- Database: We can config it in `config/database.json`

## Start Project
- In development: `npm run dev`
- Others: None

## Postman
We can use `Simple Collection.postman_collection.json` file in the project to test the endpoints.

1. We need to create a class room in order to create a student
2. After creating a student, we can login
3. After login successfully we can logout or go to protected route

**Note:** We can easily test the protected route without copy the `token` to the `header` in postman. The collection had a test script to attach the token from the `login` response into the collection `access_token` variable.

## .env
- Require 2 env variables: PORT and TOKEN_SECRET
