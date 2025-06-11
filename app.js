const express = require('express');
const app = express()
const path = require('path')
const { log } = require('console');

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

const userModel = require('./models/users');


app.get('/', (req,res)=>{
    res.render("index")
})

app.get('/read', async (req,res)=>{
    let users = await userModel.find()
    res.render("edit", {users})
     
})

app.get('/delete/:deleteUser', async (req,res)=>{
    let deletedUser = await userModel.findOneAndDelete({_id: req.params.deleteUser})
    res.redirect('/read')

})


app.get('/edit/:id', async (req,res)=>{
    let user = await userModel.findOne({_id: req.params.id})
    res.render("updateuser", {user})

})

app.post('/update/:id', async (req,res)=>{
    let {name, image, email} = req.body;
    let user = await userModel.findOneAndUpdate({_id: req.params.id}, {name, image, email}, {new: true})
    res.redirect("/read")

})

app.post('/create', async(req,res)=>{
    let {name, email, image } = req.body;

    if( name && email && image){
     let createdUser =await userModel.create({
        name,
        email,
        image
    })
   res.redirect('/read')

    }
    else{
        res.send("Enter all fields")
    }
  
})


app.listen(3000,()=>{
    console.log("server running at the port adress http://localhost:3000/");
    
})