//server.js

const express = require("express");
const cors = require("cors");
const threadsRoutes = require("./routes/threads");

const app = express();
const PORT = 5001;

// ✅ Fixar CORS
const corsOptions = {
  origin: "http://localhost:5173", // Endast tillåten frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Hanterar preflight requests

app.use(express.json());

// Lägg till alla rutter
app.use("/threads", threadsRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

/*

const express = require("express");
const cors = require("cors");
const threadsRoutes = require("./routes/threads");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5001;

//  lägger till alla rutter (endpoints) från threadsRoutes till /threads.
// Add routes to threadroutes
app.use("/threads", threadsRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

 
 */
