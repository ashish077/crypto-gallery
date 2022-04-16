const express = require("express");
var fs=require("fs")
var cors=require("cors")
const app = express();
const port = 4000;


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors())

app.get("/", (_req, res) => {
   
  let data;
  fs.readFile( __dirname + "/" + "list.json", 'utf8', function (_err, itemb) {
   data = JSON.parse(itemb);
   
  console.log(data);
  res.set('Access-Control-Allow-Origin','*');
  //res.end(JSON.stringify(data)); 
  res.send(JSON.stringify(data));
  });
  
});

app.patch('/:id', async (req,res) =>{
  //fetch file details in an object
  let content = JSON.parse(fs.readFileSync(__dirname + "/" + "list.json", 'utf8'));
//update details
console.log(content[req.params.id]);

content[req.params.id-1].sold ="true";
console.log(content[req.params.id]);
//write file
 const response=await fs.writeFileSync(__dirname + "/" + "list.json", JSON.stringify(content));
 res.json(JSON.stringify(content));

});



/* Error handler middleware */
app.use((err, _req, res, _next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});