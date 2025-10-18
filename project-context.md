
Assignment: Product Management App
Deadline: Saturday, October 18, 2025, by 11:59 PM (Dhaka Time)

Goal:
Build a Next.js (App Router) application that allows a user to browse, create, edit, view details, and delete products. Focus on polished UI/UX, solid validation, and clean code. Please use this "color palette" for your design.

-- Color-palette: 
Rich-black: #0D1821;
Anti-flash white: #EFF1F3;
hooker's green: #4E6E5D;
Lion: #AD8A64;
chestunt: #A44A3F;


Quick API notes
Authentication: send POST /auth with the same email you used on your job application, e.g., { "email": "you@example.com" } to get a JWT. Include the token as Authorization: Bearer on every request.

-- Required tech stack
Framework: Next.js (App Router)
Library: React
State management: Redux Toolkit
Styling: Tailwind CSS (or any other of your choice)

-- Functional requirements:
Auth & session
Simple login screen that accepts an email, calls POST /auth, store the JWT in the redux store, and send it with product requests.

-- Provide logout functionality.

-- Products page:
Display all products with pagination.
Real-time search by product name.
Delete product with a confirmation pop-up.
Cache data where necessary; ensure cache invalidation or updates after create/edit/delete.

-- Create & Edit pages
Single form for create and edit flows.
Create product with category and update product category.
Client-side validations on all fields: required fields, correct types (number/string), and custom validations (e.g., price > 0).

-- Show inline validation messages and error handling.

-- Details page:
Full product information with actions: Edit, Delete (confirmation).
UX / UI expectations (very important)
Modern, visually consistent design with attention to spacing, typography.

-- Responsive layout (mobile, desktop).
-- Clear loading and error states for network operations.
-- Smooth user flows for primary actions (create, edit, delete).
-- Deployment (Mandatory)

You must deploy the project to Vercel, Netlify, or a similar hosting platform and provide the following:

-- Public GitHub repository URL

-- Live deployed link:
https://test-app-madhnagar.vercel.app/

-- What we will evaluate:
- Feature completeness — All core CRUD flows (products, search, pagination, create, edit, details, delete)
- UX / UI design — Visual polish, layout consistency, and responsive behavior. (This is important)
- Code quality & best practices — Component structure, modularity, readability, and use of Redux Toolkit.
- Validation & error handling — Proper client-side validations and handling of server errors.
- Extras/innovations — Thoughtful bonus features (e.g., filter products by category), micro-interactions, improvements, or thoughtful trade-offs.


APi Details :
1. Mock Auth API:
Get Auth Token:
Request
You can get a JWT authentication token by using the /auth endpoint. Send the email as a JSON body.
https://api.bitechx.com/auth
Method: POST
Body: { "email": "madhnagar@gmail.com" }
Response: {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
Authorization Header:
Request
All API routes are protected and require authentication. You must include a valid JWT token in the request headers.
{
  "headers": {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}

Note: All API routes are protected and require authentication. You must include a valid JWT token in the request headers as Authorization: Bearer <your_jwt_token> and JSON body. API call. multipart/form-data is not supported. Set Content-Type: application/json.

2. Products API:
--2.0 Get Products:
Request
You can access the list of 50 products by using the /products endpoint.
Method: GET
https://api.bitechx.com/products
Response:
[
  {
    "category": {
      "createdAt": "2025-09-30T11:07:09.824206+00:00",
      "description": null,
      "id": "9c1129eb-cb7f-4c34-a94e-193a40f37a87",
      "image": "https://i.imgur.com/QkIa5tT.jpeg",
      "name": "Clothes",
      "updatedAt": "2025-09-30T11:07:09.824206+00:00"
    },
    "createdAt": "2025-09-29T11:09:16.110463+00:00",
    "description": "test product description",
    "id": "0133b509-e436-4a14-b5c4-91b2a19aadc4",
    "images": [
      "https://laravelpoint.com/files/p_img.jpg"
    ],
    "name": "test product 1133",
    "price": 1000,
    "slug": "test-product-1133",
    "updatedAt": "2025-09-30T11:09:16.110463+00:00"
  }
]
--2.1 Pagination:
Request
You can paginate products by adding the `offset` and `limit` as query parameters.
Method: GET
https://api.bitechx.com/products?offset=5&limit=10

--2.2 Filter by category id:
Request
You can filter products by adding a `categoryId` as query parameter.
Method: GET
https://api.bitechx.com/products?categoryId=9c1129eb-cb7f-4c34-a94e-193a40f37a87

--2.3 Get a single product by slug:
Request
You can get a single product by adding the `slug` as a parameter: /products/:slug
Method: GET
https://api.bitechx.com/products/test-product-1133
Response:
{
  "category": {
    "createdAt": "2025-09-30T11:07:09.824206+00:00",
    "description": null,
    "id": "9c1129eb-cb7f-4c34-a94e-193a40f37a87",
    "image": "https://i.imgur.com/QkIa5tT.jpeg",
    "name": "Clothes",
    "updatedAt": "2025-09-30T11:07:09.824206+00:00"
  },
  "createdAt": "2025-09-29T11:09:16.110463+00:00",
  "description": "test product description",
  "id": "0133b509-e436-4a14-b5c4-91b2a19aadc4",
  "images": [
    "https://laravelpoint.com/files/p_img.jpg"
  ],
  "name": "test product 1133",
  "price": 1000,
  "slug": "test-product-1133",
  "updatedAt": "2025-09-30T11:09:16.110463+00:00"
}

--2.4 Search product by name: 
Request
You can search for a product by using the "/search" endpoint with the `searchedText` query parameter.
Method: GET
https://api.bitechx.com/products/search?searchedText=test+pro

Response:
[
  {
    "category": {
      "createdAt": "2025-09-30T11:07:09.824206+00:00",
      "description": null,
      "id": "9c1129eb-cb7f-4c34-a94e-193a40f37a87",
      "image": "https://i.imgur.com/QkIa5tT.jpeg",
      "name": "Clothes",
      "updatedAt": "2025-09-30T11:07:09.824206+00:00"
    },
    "createdAt": "2025-09-29T11:09:16.110463+00:00",
    "description": "test product description",
    "id": "0133b509-e436-4a14-b5c4-91b2a19aadc4",
    "images": [
      "https://laravelpoint.com/files/p_img.jpg"
    ],
    "name": "test product 1133",
    "price": 1000,
    "slug": "test-product-1133",
    "updatedAt": "2025-09-30T11:09:16.110463+00:00"
  }
]

--2.5 Create a product:
Request
You can create a new product by sending an object like the following to "/products"
Method: POST
https://api.bitechx.com/products
{
  "categoryId": "9c1129eb-cb7f-4c34-a94e-193a40f37a87",
  "description": "New product description",
  "images": [
    "https://laravelpoint.com/files/p_img.jpg"
  ],
  "name": "New Product",
  "price": 1000
}

Response:
{
  "category": {
    "createdAt": "2025-09-30T11:07:09.824206+00:00",
    "description": null,
    "id": "9c1129eb-cb7f-4c34-a94e-193a40f37a87",
    "image": "https://i.imgur.com/QkIa5tT.jpeg",
    "name": "Clothes",
    "updatedAt": "2025-09-30T11:07:09.824206+00:00"
  },
  "createdAt": "2025-09-29T11:09:16.110463+00:00",
  "description": "New product description",
  "id": "0133b509-e436-4a14-b5c4-91b2a19aadc4",
  "images": [
    "https://laravelpoint.com/files/p_img.jpg"
  ],
  "name": "New Product",
  "price": 1000,
  "slug": "new-product",
  "updatedAt": "2025-09-30T11:09:16.110463+00:00"
}

--2.6 Update a product: 
Request
You can update a product by sending an object like the following and adding the `id` as a parameter: /products/:id
Method: PUT
https://api.bitechx.com/products/:id
{
  "description": "New product description Updated",
  "name": "New Product Updated"
}
Response:
{
  "category": {
    "createdAt": "2025-09-30T11:07:09.824206+00:00",
    "description": null,
    "id": "9c1129eb-cb7f-4c34-a94e-193a40f37a87",
    "image": "https://i.imgur.com/QkIa5tT.jpeg",
    "name": "Clothes",
    "updatedAt": "2025-09-30T11:07:09.824206+00:00"
  },
  "createdAt": "2025-09-29T11:09:16.110463+00:00",
  "description": "New product description Updated",
  "id": "0133b509-e436-4a14-b5c4-91b2a19aadc4",
  "images": [
    "https://laravelpoint.com/files/p_img.jpg"
  ],
  "name": "New Product Updated",
  "price": 1000,
  "slug": "new-product",
  "updatedAt": "2025-09-30T11:09:16.110463+00:00"
}

--2.7 Delete a product:
Request
You can delete a product by adding the `id` as a parameter: /products/:id. Please note that the endpoint will simulate a 200 response and return the id if its valid. The product will not be deleted in the Database.
Method: DELETE
https://api.bitechx.com/products/:id

{
  "description": "New product description Updated",
  "name": "New Product Updated"
}
Response:
{
  "category": {
    "createdAt": "2025-09-30T11:07:09.824206+00:00",
    "description": null,
    "id": "9c1129eb-cb7f-4c34-a94e-193a40f37a87",
    "image": "https://i.imgur.com/QkIa5tT.jpeg",
    "name": "Clothes",
    "updatedAt": "2025-09-30T11:07:09.824206+00:00"
  },
  "createdAt": "2025-09-29T11:09:16.110463+00:00",
  "description": "New product description Updated",
  "id": "0133b509-e436-4a14-b5c4-91b2a19aadc4",
  "images": [
    "https://laravelpoint.com/files/p_img.jpg"
  ],
  "name": "New Product Updated",
  "price": 1000,
  "slug": "new-product",
  "updatedAt": "2025-09-30T11:09:16.110463+00:00"
}

3. Category API:
--3.0 Get Categories:
Request
You can access the list of categories by using the "/categories" endpoint.
Method: GET
https://api.bitechx.com/categories
Response:
[
  {
    "createdAt": "2025-09-30T11:07:09.824206+00:00",
    "description": null,
    "id": "9c1129eb-cb7f-4c34-a94e-193a40f37a87",
    "image": "https://i.imgur.com/QkIa5tT.jpeg",
    "name": "Clothes"
  }
]

--3.1 Pagination: 
Request
You can paginate categories by adding the `offset` and `limit` as query parameters.
Method: GET
https://api.bitechx.com/categories?offset=5&limit=10


--3.2 Search category by name:
Request
You can search for a category by using the "/search" endpoint with the `searchedText` query parameter.
Method: GET
https://api.bitechx.com/categories/search?searchedText=cloth
Response:
[
  {
    "createdAt": "2025-09-30T11:07:09.824206+00:00",
    "description": null,
    "id": "9c1129eb-cb7f-4c34-a94e-193a40f37a87",
    "image": "https://i.imgur.com/QkIa5tT.jpeg",
    "name": "Clothes"
  }
]








