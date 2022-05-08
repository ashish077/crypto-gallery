const express = require("express");
var router = express.Router();
var fs = require("fs");
const multer = require('multer');
const app = express();
var cors = require('cors');
const port = process.env.PORT|| 4000;
var id = 100;


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, './images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})
const upload = multer({storage: storage}).single('image');
// const upload = multer({storage: storage});

app.use('/images', express.static('./images'));
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

if (process.env.NODE_ENV === 'production')
{
 app.use(express.static('../frontend/crypto-gallery/build'));
}
app.get("/", (_req, res) => {

  let data;
  fs.readFile( __dirname + "/" + "list.json", 'utf8', function (_err, items) {
  data = JSON.parse(items);

  res.set('Access-Control-Allow-Origin','*');
  res.send(JSON.stringify(data));
  });

});

app.get("/");

app.post("/addart", (req, res, err) => {
    upload(req, res, function(error){
    if (error instanceof multer.MulterError) {
      return res.status(500).json(error);
    } 
    else if (error) {
        return res.status(500).json(error);
    }

    console.log("Successfully uploaded files");
    let data;
    var newId;
    let filename = "";
    if(req.file != null){
      filename = req.file.filename;
    }
    fs.readFile( __dirname + "/" + "list.json", 'utf8', function (_err, items) {
      data = JSON.parse(items);
      
      // console.log("Inside post");
      // console.log(data);
      newId = data.length + 1;
        var newItem = {
          id: newId,
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          src: 'http://localhost:4000/images/' + filename,
          owner: req.body.owner
        };
        data.push(newItem);
        console.log(data);

        fs.writeFile(__dirname + "\\" + "list.json", JSON.stringify(data, null, 2), err => {
              console.log("New data added");
            });

        res.json({ message: "Successfully uploaded files", id: String(newId) });
        return res.status(200);
      });      
  }) 
});

app.put('/:id/:buyer', (req,res) =>{
  //fetch file details in an object
  let content = JSON.parse(fs.readFileSync(__dirname + "/" + "list.json", 'utf8'));
  //update details
  
  content[req.params.id-1].sold ="true";
  content[req.params.id-1].owner =[req.params.buyer];
  //write file
  fs.writeFileSync(__dirname + "/" + "list.json", JSON.stringify(content, null, 2));
  res.json(content);

});



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