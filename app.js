const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs")
const serverless = require("serverless-http")
const router = express.router();
// const bodyparser = require("body-parser")
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/ContactDance', {useNewUrlParser: true});
const port = process.env.PORT || 80;

module.exports.handler = serverless('app')

// const contactSchema = new mongoose.Schema({
//     name: String,
//     contact: String,
//     Email: String,
//     consern: String
// });
// const contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())
app.use('/.netlify/function/app',router);

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'PubG is the best game', "content": con}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'PubG is the best game', "content": con}
    res.status(200).render('contact.pug', params);
})

app.get('/P-details', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'PubG is the best game', "content": con}
    res.status(200).render('P-details.pug', params);
})


router.get('/index', (req,res)=>{
    res.send("app is running")
})
// app.post('/contact', (req, res)=>{
//     var myData = new contact(req.body);
//     myData.save().then(()=>{
//         res.send("This item has been saved to the database")
//     }).catch(()=>{
//         res.status(400).send("item data has not be sent to database")
//     })
// })

app.post('/contact', (req, res)=>{
    name = req.body.name
    contact = req.body.contact
    Email = req.body.Email
    consern = req.body.consern
    let outputToWrite = `the name of the client is ${name}, His/her Contact = ${contact},
    Email is ${Email}, Client consern ${consern}`
    fs.writeFileSync('output.txt' , outputToWrite)
    const parms = {'message': 'Your form has been submitted successfully'}
    res.status(200).render('contact.pug', parms)
})

app.post('/P-details', (req, res)=>{
    name = req.body.name
    contact = req.body.contact
    Email = req.body.Email
    let outputToWrite = `the name of the client is ${name}, His/her Free Fire Uid= ${contact},
    Email is ${Email}`
    fs.writeFileSync('form.txt' , outputToWrite)
    const parms = {'message': 'Your form has been submitted successfully'}
    res.status(200).render('P-details.pug', parms)
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});