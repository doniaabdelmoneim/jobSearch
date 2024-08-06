# Job Search App

## Overview

This project is a job search application that allows users to search for jobs relevant to their domain or area of interest. The application has various components that handle API calls, posting job details, and error messages.

## Features: 

- Filter option to get the required job
- Handles user data
- Handles company data
- Handles job applications

## Technologies Used

* Express: A Node.js web framework for building RESTful APIs
* Mongoose: A MongoDB object modeling tool for interacting with the database
* Bcrypt: A library for hashing and salting passwords
* Jsonwebtoken: A library for generating and verifying JSON Web Tokens
* Joi: A library for validating JavaScript objects
* Cloudinary: A cloud-based media management platform for storing and serving images
* Multer: A middleware library for handling multipart/form-data requests
* Nanoid: A library for generating unique IDs
* Nodemailer: A library for sending emails

## Getting Started:

### Installation:

- To install the dependencies, run the following command:
bash
Edit
Copy code
npm install
Environment Variables
Create a .env file in the root directory and add the following environment variables:
MONGO_URI: The MongoDB connection string
CLOUDINARY_CLOUD_NAME: The Cloudinary cloud name
CLOUDINARY_API_KEY: The Cloudinary API key
CLOUDINARY_API_SECRET: The Cloudinary API secret
JWT_SECRET: The secret key for generating JSON Web Tokens
EMAIL_HOST: The email host
EMAIL_PORT: The email port
EMAIL_USERNAME: The email username
EMAIL_PASSWORD: The email password

### Running the Application

To start the application, run the following command:

bash
Edit
Copy code
npm start

*** API Documentation ***

postman url: https://documenter.getpostman.com/view/33348823/2sA3rxrtnY


## License
This project is licensed under the MIT License.

## Contributing
Contributions are welcome! Please submit a pull request with your changes and a brief description of what you've added or fixed.

## Acknowledgments
postman: for providing a platform for documentation and project management.
Cloudinary :for providing a cloud-based media management platform.
Nodemailer : for providing a library for sending emails.
