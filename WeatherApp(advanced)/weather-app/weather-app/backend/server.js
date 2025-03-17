const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = "mongodb+srv://tharunraman10:dbpassword@weatherdb.ubu92.mongodb.net/weatherDB?retryWrites=true&w=majority&appName=weatherdb";

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Atlas Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
const weatherRoutes = require("./routes/weatherRoutes");
app.use("/api/weather", weatherRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
