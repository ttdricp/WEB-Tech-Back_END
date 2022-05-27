const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser=require('body-parser');
const PurchaseRoute = require('./app/router/Purchase');
const regRoute = require('./app/router/regRouter')
const AdminRoute = require('./app/router/Admin')
const PORT = process.env.PORT || 3000
const app = express()

const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())

app.use('/purchase',PurchaseRoute)
app.use('/user', regRoute)
app.use('/admin', AdminRoute)



app.use(express.static("views"))

app.set('view engine', 'ejs')
app.use('/styles',express.static(__dirname +'/styles'));
app.use('/fonts',express.static(__dirname +'/fonts'));
app.use('/images',express.static(__dirname +'/images'));

app.use("/", require("./routes/"));

app.use("/accessories", require("./routes/accessories"));
app.use("/about", require("./routes/about"));
app.use("/SignUp", require("./routes/registration"));
app.use("/SignIn", require("./routes/login"));

app
    .get("/", (req, res) => {
        res.render("index");
    })
    .get("/login", (req, res) => {
        res.render("login");
    })
    .get("/registration", (req, res) => {
        res.render("registration");
    })



    .get('/create',function (req,res){
    res.render('create')
})
    .get('/update',function (req,res){
    res.render('update')

})
    .get('/delete',function (req,res){
    res.render('delete')

})
    .get('/results',function (req,res){
    res.render('results')

})
    .get('/find',function (req,res) {
        res.render('find')
    });



const start = async () => {
    try{
        await mongoose.connect('mongodb+srv://ttdricp:Asd74625@cluster0.2xlo9.mongodb.net/listOfRegistered?retryWrites=true&w=majority')
        app.listen(PORT, () =>
            console.log(`App listening at http://localhost:${PORT}`)
        );}
    catch (e) {
        console.log(e)
    }

}
start()
