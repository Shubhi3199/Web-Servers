const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define path for express config.
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const templatesPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(templatesPath);

// this serves the complete folder including html, js, css..Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) =>{
   geocode(req.query.search, ( errorGeocode, {location, latitude, longitude} = {} ) =>{
      if(errorGeocode){
         res.render('errorPage', {
            error: errorGeocode
         })
      }else{
         forecast(latitude, longitude, (errorForecast, {temperature, windSpeed} = {}) =>{
            if(errorForecast){
               res.render('errorPage', {
                  error: errorForecast
               })
            }else {
               // res.render('index', {
               //    title: location,
               //    description: `the temperature currently is ${temperature} and wind speed is calculated to be ${windSpeed}`
               // })
               res.send({    // for creating a JSON HTTP endpoint
                  location: location,
                  forecast: `the temperature currently is ${temperature} and wind speed is calculated to be ${windSpeed}`
               })
            }
         })
      }
   })
});
app.get('/admin', (req, res) =>{
   res.render('admin',{
      name: 'Shubham',
      profession: 'Student'
   })
});
app.get('/help/*', (req, res) =>{
   res.render('errorPage', {
      error: 'Help article not Found!!'
   });
});
app.get('*', (req, res)=>{
   res.render('errorPage', {
      error: 'Page not Found'
   });
});




app.listen(3000, ()=>{
   console.log(`check the server running at port 3000`);
});

// const aboutFilePath = path.join(__dirname, '../public/about.html');
// app.get('/about', (req, res) =>{
//    res.send(express.static(aboutFilePath));
// });

// app.get('', (req, res) =>{
//    // res.sendFile(publicDirectoryPath + '/index.html');  // this only serves a particular html file and no images or css
// });
// app.get('/about', (req, res) =>{
//    res.sendFile(publicDirectoryPath + '/about.html');
// });
