const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

let orders = [];

app.post("/orders", (req, res) => {
  const orderDetails = req.body;
  orders.push(orderDetails);
  console.log("Order received:", orderDetails);
  res.status(201).send({ message: "Order placed successfully" });
});

app.get("/", (req, res) => {
    res.send("Hello, World!");
    });

app.get("/orders", (req, res) => {
  res.status(200).json(orders);
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
