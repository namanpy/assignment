Assignment - Naman Sharma
============
### Deployment

The project is deployed to [Render.com](https://render.com/). You can access the deployed application via this URL: [https://assignmentrepo-latest.onrender.com](https://assignmentrepo-latest.onrender.com).

### Postman Collection

A Postman collection for testing the API is available at this URL: [Postman Collection](#).

Overview
--------

This project provides an API for handling specific tasks using Node.js, Express, Puppeteer, and TypeScript. It uses MongoDB Atlas with Mongoose for database operations and Render.com for deployment.

Tech Stack
----------

*   **Node.js**: Backend runtime environment
*   **Express.js**: Web framework for building APIs
*   **Puppeteer**: Headless browser for generating PDFs and images
*   **TypeScript**: Typed superset of JavaScript
*   **Mongoose**: ODM for MongoDB
*   **MongoDB Atlas**: Cloud-hosted MongoDB instance
*   **Render.com**: For hosting the application

Setup Instructions
------------------

### Prerequisites

Ensure you have the following installed:

*   [Node.js](https://nodejs.org/en/) (v14.x or later)
*   [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas) for the database connection

### Local Setup

1.  **Clone the repository**:
    
        git clone https://github.com/your-username/project-repo.git
        cd project-repo
            
    
2.  **Set Environment Variables**:  
    Set the MongoDB connection string in your local environment:
    
        export MONGO_URL=your-mongo-connection-string
    
3.  **Install dependencies**:
    
        npm install
    
4.  **Run the application**:  
    To run the project locally:
    
        npm run dev
    
    This will start the server in development mode.


Scripts
-------

*   **npm run dev**: Runs the app in development mode
*   **npm run build**: Builds the project

*   `services`: Contains data access, and business logic
*   `models`: Mongoose models for MongoDB collections.
*   `controllers`: Contains logic for handling API requests.
*   `routers`: API routes definitions.
*   `scehmas`: Joi Schemas for validation of inputs
*   `utils`: Utility functions for the project.
*   `index.ts`: Main entry point of the application.
