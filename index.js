const express = require("express");

const app = express()
const bodyParser = require('body-parser')
const cool = require('cool-ascii-faces');
const View = require('./routes/api');



const { Pool } = require('pg');


app.set('view engine' , 'ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({ extended: false }))





app.get("/",(req,res,next)=>
{
   
    
    res.render('home',
    {
        title:'Banking System',
      

    })
})


app.get("/viewall",View.viewall)



app.get('/details/:Id',View.Details)

app.get('/transactions',View.Transactions)

app.get("/negative",(req,res,next)=>
{
    res.render('negative',
    {
       title:'Transaction Failed',
        msg:'Transaction Failed!'
    })
})

app.get("/success",(req,res,next)=>
{
    res.render('Success',
    {
        title:'Transaction Successful',
        msg:'Transaction Successful'
        
    })
})
app.post('/amount',View.Amount)
app.get('/cool', (req, res) => res.send(cool()))
app.post('/moneytransfer',View.Moneytransfer)
app.get('/times', (req, res) => res.send(showTimes()))

app.get("/history",View.history)

showTimes = () => {
    let result = '';
    const times = process.env.TIMES || 5;
    for (i = 0; i < times; i++) {
      result += i + ' ';
    }
    return result;
  }

  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`));