# Tutor-app API

RESTful API built with Node.js, Express.js, Mongoose, Bcrypt and JWT. It uses 'jsonwebtoken' to create the token which was used to protect routes.

[https://tutoronlineapp.herokuapp.com/]

## Quick Start

```bash
# Install dependencies
npm install

# Serve on localhost:3000
npm run start

or   

npm run dev-start
```
```
ADMIN======>
email:sirgreg@gmail.com
password:sirgreg
```

## API Endpoints and examples

### Category Routes

#### GET get categories
API endpoint to fetch all category in the category collection.

    GET /v1/category

* A successful API request will return HTTP 200 status with a list of categories.

* Request done an empty category collection will return an empty array.

#### Example Response
<img src='./img/getcategory.png'>

#### POST create category 

API endpoint to create category in the category collection.

    POST /v1/category/create

* A successful API request will return HTTP 201 status. Only an admin can perform this request.

```
{
	"category": "nursery"
}
```
#### Example Response
<img src='./img/createcategory.png'>