import express from "express";
import gameRoutes from "./routes/game";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", gameRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
