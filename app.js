const { dir } = require('console');
const express= require('express')
const https=require('https');

const bodyparser= require('body-parser')
const app= express();
app.use(bodyparser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+ "/index.html");
    
})
app.post('/',(req,res)=>{
    console.log("The Request is Received");
    
    const query= req.body.cityname
   const apikey='cf56e5447d636a42cac792ad1b09c495'
   const url='https://api.openweathermap.org/data/2.5/weather?q='+ query +'&appid='+apikey+'&units=metric'
   https.get(url,(response)=>{
       //console.log(respose.statusCode);
       response.on('data',(data)=>{
           //console.log(data);
           const weatherdata=JSON.parse(data);
           const temp=weatherdata.main.temp;
           const description=weatherdata.weather[0].description
           //console.log(description);
           res.write("<h1>The Temperature in "+query+" is " +temp+ " Degree Celcius</h1>")
           res.write("<p>The Weather description is "+description+"</p>")
       })
   })
})

app.listen(3000,()=> console.log("our server is running at port 3000"))