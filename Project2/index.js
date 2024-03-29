const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const multer = require('multer');
require('dotenv').config()
//middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,'./uploads');
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`);
    }
})


const upload = multer({storage:storage});


//routes
app.get('/', (req, res) => {
  return res.render('home')
})

app.post('/upload', upload.single('profileImage'), (req,res)=>{
  

   return res.redirect('/');

})


//server
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})
