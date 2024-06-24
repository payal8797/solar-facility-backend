const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const multer = require('multer');
const uploadController = require('./controller/uploadController');
const cors = require('cors');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const connectDB = require('./database/db');
const { authMiddleware } = require('./middleware/auth');

const startServer = async () => {
  const app = express();

  // Enable CORS
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true 
  }));

  // Multer setup for file upload
  const upload = multer({ dest: 'uploads/' });

  // Route for handling file upload
  app.post('/upload', authMiddleware, upload.single('csvfile'), uploadController.handleFileUpload);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: ({ req }) => {
      // Get the user object from req if authenticated
      const token = req.headers.authorization;
      return token;
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  // Connect to MongoDB
  await connectDB();

  // Start the server
  app.listen({ port: 5000 }, () => {
    console.log(`Server running at http://localhost:5000${server.graphqlPath}`);
  });
};

startServer();
