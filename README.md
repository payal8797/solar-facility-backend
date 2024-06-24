# Solar Facility Management Application

## Application architecture
This application allows users to manage solar facilities, upload performance data via CSV, and visualize the facility's performance over time using interactive charts. It is built using Node.js with Apolli GraphQL API and MongoDB for data storage.

## Available Scripts

Clone the repository, navigate to the project directory and install dependencies using npm or yarn:
### `npm install`
### `yarn start`
 
In the project directory, you can run:

### `npm start`

Make sure you change the database URI with yours in db.js

## Key Components:

### Backend (Node.js):
    
Handles HTTP requests and responses.
Implements GraphQL API using Apollo Server.
Manages data persistence with MongoDB using Mongoose for object modeling.
Integrates JWT for user authentication and authorization.

CSV Upload api doesn't uses GraphQL since there were problem with the version of graphql-upload package. Reported it here: https://github.com/apollographql/apollo-server/discussions/7892, since I was following the official ducumentation. But they closed it considering it is to be explicitly handled by graphql-upload.

### Database (MongoDB):

Stores user data (authentication), facility information, and performance metrics.
Schema design with Mongoose allows structured data storage and retrieval.

### Frontend (React):

Provides a user-friendly interface for managing solar facilities and uploading CSV data.
Communicates with the backend via GraphQL queries and mutations.

### GraphQL API (Apollo Server):

Serves as the middleware between the frontend and database.
Defines schema and resolvers for handling CRUD operations on facilities and user authentication.

### Authentication (JWT):

Allows users to securely sign up, log in, and log out.
Verifies user credentials and provides access tokens for authenticated requests.


## GraphQL Queries/Mutations
Please refer to queries and mutations directories in the frontend for GraphQL Queries and Mutations





