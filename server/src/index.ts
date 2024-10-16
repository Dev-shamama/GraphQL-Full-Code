import express from 'express';
import mongoDBConnect from './db/db.js';
import connectGraphQl from './graphql/graphql.js';
import { expressMiddleware } from "@apollo/server/express4";
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import cors from "cors";
import path from "path"
import { fileURLToPath } from 'url';
import config from './config/config.js';

const port = config.PORT || 5000;
const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(cors({
    origin: '*',
}));

app.use('/uploads', express.static(path.join(__dirname, "./uploads")));

// Database Call Here
mongoDBConnect();
app.use(graphqlUploadExpress())

const graphQLServer = connectGraphQl();
await graphQLServer.start()

app.use("/api/v1/graphql", expressMiddleware(graphQLServer, {
    context: async ({ req }) => ({
        token: req.headers.token,
        // Add More Context Headers
    }),
}))

app.get("/api/v1/test", (req, res) => {
    res.json({ status: true, message: "welcome" })
})

app.listen(port, () => {
    console.log(`> Server is up and running on port: HTTP://LOCALHOST:${port}`)
})
