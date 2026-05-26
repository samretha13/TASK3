const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Coffee = require("./models/Coffee");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/coffeeDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

async function seedData() {
  const count = await Coffee.countDocuments();

  if (count === 0) {
    await Coffee.insertMany([
      { name: "Cappuccino" },
      { name: "Espresso" },
      { name: "Latte" },
      { name: "Mocha" }
    ]);

    console.log("Default Coffee Added");
  }
}

seedData();

app.get("/coffees", async (req, res) => {
  const coffees = await Coffee.find();
  res.json(coffees);
});

app.post("/vote/:id", async (req, res) => {
  const coffee = await Coffee.findById(req.params.id);

  coffee.votes += 1;

  await coffee.save();

  res.json(coffee);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
