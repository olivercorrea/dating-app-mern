import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import Cards from "./dbCards.js";

// App config
const app = express();
const port = process.env.PORT || 8001;

const connection_url = "mongodb://localhost:27017/datingDB";

// Middleware
app.use(express.json());
app.use(Cors());

// DB config
async function connectToDatabase() {
  try {
    await mongoose.connect(connection_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // ! "useCreateIndex" This option is deprecated in Mongoose 6 and is no longer supported
      //   useCreateIndex: true,
    });
    console.log("Conectado exitosamente a MongoDB");
  } catch (error) {
    console.log("Error al conectarse a MongoDB:", error);
  }
}

connectToDatabase();

// API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello world"));
/*
app.post("/dating/cards", (req, res) => {
  const dbCard = req.body;
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
*/

app.post("/dating/cards", async (req, res) => {
  try {
    const dbCard = req.body;
    const newCard = await Cards.create(dbCard);
    res.status(201).send(newCard);
  } catch (error) {
    res.status(500).send(error);
  }
});

/*
app.get("/dating/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
*/

app.get("/dating/cards", async (req, res) => {
  try {
    const cards = await Cards.find();
    res.status(200).send(cards);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
