import express from "express";
import { ENV } from "./config/env";
import { clerkMiddleware, ClerkMiddleware } from "@clerk/express";
import cors from "cors";

const app = express();

app.use(cors({ origin: ENV.FRONTEND_URL }));
app.use(clerkMiddleware()); // auth obj will be attached to the req
app.use(express.json()); // parses JSON request bodies.
app.use(express.urlencoded({ extended: true })); //parses form data (like HTML forms).

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Productify API",
    endpoints: {
      user: "/api/users",
    },
  });
});

app.listen(ENV.PORT, () =>
  console.log("Server is up and running on PORT:3000"),
);
