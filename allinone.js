const express = require("express")
require("dotenv").config();

const app = express();
const port = process.env.PORT1
const mongoose = require("mongoose")

async function connectToTheDB() {
try {
await mongoose.connect(process.env.MY_MONGO_KEY, {
  family: 4
});
console.log("MongoDB Connected!!!");
} catch (err) {
console.error("Something broke somewhere...likely this:" + err);
process.exit(1);
}
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    default: 0
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("User", userSchema);
connectToTheDB();

app.get("/", (req, res) => {
res.send("I'm working!")
});

app.listen(port, () => {
console.log(`Server up and kicking on port ${port}`);
})
