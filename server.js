const express = require("express");
const path = require('path')
const hbs = require('hbs');
const app = express();
const requests = require('requests');

// console.log(path.join(__dirname,"./Templates/views"));
const staticFilesPath = path.join(__dirname,"/public");
const templatePath = path.join(__dirname,"./Templates/views")
const partialsPath = path.join(__dirname,"./Templates/partials")
//Middlewares
hbs.registerPartials(partialsPath)
app.set("view engine", "hbs");
app.set("views", templatePath );

//Routes
app.get("/:name",(req, res)=>{
    const {name} = req.params;
    // console.log(name);
    requests(`http://api.weatherapi.com/v1/current.json?key=bfdc18ed82d14079ae091957231207&q=${name}&aqi=no`)
    .on("data",(chunk)=>{
        // console.log(chunk);
        const objData = JSON.parse(chunk);
        // console.log(objData);
        // const arrayData = [objData];
          const  nameLocation= objData.location?.name
          const  region = objData.location?.region
          const  country = objData.location?.country
          const  feelsLike= objData.current?.temp_c
        return res.render("index", {
            name: nameLocation,
            region,
            country ,
            feelsLike
         })

    })
})

//Server Creation
app.listen(5000,()=>{
    console.log("Listening on port 5000.");
})

//http://api.weatherapi.com/v1/current.json?key=bfdc18ed82d14079ae091957231207&q=Islamabad&aqi=no