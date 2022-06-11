# E-commerce-Node JS
E commerce Rest API made with Node/Express JS

# Setup .env File
- MONGO_URI 
- JWT_SECRET
- JWT_EXPIRATION 

# Routes
#### Auth
- Get - https://e-commerce-api-batzdk.herokuapp.com/api/v1/auth/logout [LOGOUT]
- Post - https://e-commerce-api-batzdk.herokuapp.com/api/v1/auth/login [LOGIN]
- Post - https://e-commerce-api-batzdk.herokuapp.com/api/v1/auth/register [REGISTER]

#### Users
- Get - https://e-commerce-api-batzdk.herokuapp.com/api/v1/users/ [GET USERS]
- Get -  https://e-commerce-api-batzdk.herokuapp.com/api/v1/users/showMe [GET CURRENT USER]
- Get -  https://e-commerce-api-batzdk.herokuapp.com/api/v1/users/:id [GET USER BY ID]
- Patch -  https://e-commerce-api-batzdk.herokuapp.com/api/v1/users/updateUser [UPDATE USER] 
- Patch -  https://e-commerce-api-batzdk.herokuapp.com/api/v1/users/updateUserPassword [UPDATE USER PASSWORD]

#### Products
- Get -  https://e-commerce-api-batzdk.herokuapp.com/api/v1/products/ [GET PRODUCTS]
- Get -  https://e-commerce-api-batzdk.herokuapp.com/api/v1/products/:id [GET PRODUCT BY ID]
- Get -  https://e-commerce-api-batzdk.herokuapp.com/api/v1/products/:id/reviews [GET PRODUCT REVIEWS]
- Post -  https://e-commerce-api-batzdk.herokuapp.com/api/v1/products/ [CREATE PRODUCT] 
- Post -  https://e-commerce-api-batzdk.herokuapp.com/api/v1/products/uploadImage [UPLOAD IMAGE]
- Patch -  https://e-commerce-api-batzdk.herokuapp.com/api/v1/products/:id [UPDATE SINGLE PRODUCT]
- Delete -  https://e-commerce-api-batzdk.herokuapp.com/api/v1/products/:id [DELETE PRODUCT]

#### Reviews
- Get - https://e-commerce-api-batzdk.herokuapp.com/api/v1/reviews/ [GET REVIEWS]
- Get -  https://e-commerce-api-batzdk.herokuapp.com/api/v1/reviews/:id [GET SINGLE REVIEW]
- Post -  https://e-commerce-api-batzdk.herokuapp.com/api/v1/reviews/ [CREATE SINGLE REVIEW]
- Patch -  https://e-commerce-api-batzdk.herokuapp.com/api/v1/reviews/:id [UPDATE REVIEW]
- Delete -  https://e-commerce-api-batzdk.herokuapp.com/api/v1/reviews/:id [DELETE REVIEW]

#### Orders
- Get - https://e-commerce-api-batzdk.herokuapp.com/api/v1/orders/ [GET ORDERS]
- Get - https://e-commerce-api-batzdk.herokuapp.com/api/v1/orders/showAllMyOrders [GET CURRENT USER ORDERS]
- Get - https://e-commerce-api-batzdk.herokuapp.com/api/v1/orders/:id [GET SINGLE ORDER]
- Post - https://e-commerce-api-batzdk.herokuapp.com/api/v1/orders/ [CREATE ORDER]
- Patch - https://e-commerce-api-batzdk.herokuapp.com/api/v1/orders/:id [UPDATE ORDER]
