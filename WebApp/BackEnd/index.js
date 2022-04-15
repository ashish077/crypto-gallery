const express = require("express");
var fs=require("fs")
const app = express();
const port = 4000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

var item=
  [
    {
      "id": 1,
      "title": "Brown eggs",
      "description": "Raw organic brown eggs in a basket",      
    }, 
    {
      "id": 2,
      "title": "Sweet fresh stawberry",
      "description": "Sweet fresh stawberry on the wooden table",      
    }, 
    {
      "id": 3,
      "title": "Asparagus",
      "description": "Asparagus with ham on the wooden table",      
    },
    {
      "id": 4,
      "title": "Asparagus",
      "description": "Asparagus with ham on the wooden table",      
    },
    {
      "id": 5,
      "title": "Asparagus",
      "description": "Asparagus with ham on the wooden table",      
    },
    {
      "id": 6,
      "title": "Asparagus",
      "description": "Asparagus with ham on the wooden table",      
    }
  ];



app.get("/", (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.json(item);
});

app.get("/")

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});