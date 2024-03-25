import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({
    limit: "16kb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));

app.use(express.static("public"));

app.use(cookieParser());

// Import DNS routes
import dnsRouter from './routes/dnsRecord.routes.js';

// Declare DNS routes
app.use("/api/v1/dns", dnsRouter);

// Import user routes
import userRouter from './routes/user.routes.js';

// Declare user routes
app.use("/api/v1/users", userRouter);

// http://localhost:8000/api/v1/dns/... for DNS routes
// http://localhost:8000/api/v1/users/... for user routes

export { app };
