import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./utils/mongodb";
import gameRoutes from "./routes/game";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
// Middleware to parse JSON
app.use(express.json());

(async () => {
  try {
    await connectToDatabase(); // Connect to MongoDB
    console.log("MongoDB connection established");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with an error
  }
})();

app.use("/api", gameRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
