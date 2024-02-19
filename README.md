


Hey there,this is the backend of the task

Steps to run this locally

1. Clone this repo
2. Connect mongodb(connection details is in .env file)
3. Install node modules
4. npm install
5. npm start




ALL THE APIs URL AND BODY

1. GET /users

URL: http://localhost:3000/users
Request Body: N/A
Description: Retrieve all users from the database.




2. POST /users

URL: http://localhost:3000/users
Request Body:
{
  "name": "string",
  "email": "string",
  "age": "number",
  "country": "string",
  "password": "string"
}
Description: Create a new user in the database.



3. PUT /users/:id

URL: http://localhost:3000/users/:id
Request Body:
json

{
  "name": "string",
  "email": "string",
  "age": "number",
  "country": "string",
  "password": "string"
}
Description: Update an existing user in the database.



4. DELETE /users/:id

URL: http://localhost:3000/users/:id
Request Body: N/A
Description: Delete a user from the database.


5.GET /users/api/aggregation

URL: http://localhost:3000/users/api/aggregation
Request Body: N/A
Description: Perform aggregation on user data to calculate total users by country and average age per country.


Note: Middleware created for logging request method, URL,access token and timestamp will run everytime u hit any API

