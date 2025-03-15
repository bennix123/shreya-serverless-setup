const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://abhishek:abhishek@cluster0.rvsxe.mongodb.net/test?retryWrites=true&w=majority";

let isConnected = false; // Track the connection status


const connectDB = async () => {
    if (isConnected) {
        console.log("Using existing database connection");
        return { status: "success", message: "Using existing database connection" };
    }

    try {
        const db = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = db.connections[0].readyState === 1;
        console.log("Connected to MongoDB");
        return { status: "success", message: "Connected to MongoDB" };
    } catch (err) {
        console.error("MongoDB connection error:", err);
        return { status: "error", message: "Database connection failed", error: err };
    }
};

module.exports = connectDB;
