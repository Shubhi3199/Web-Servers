const request = require('request');
const chalk = require('chalk');

const geocode = ( address, callback) =>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2h1YmhpMzE5OSIsImEiOiJjazR5ZGVveDgwOXB6M2x0MW1mbjhwcWExIn0.0YxCDpPtCT2vil1GgAjKgw&limit=1`;

    request({ url, json: true}, ( error, {body} ) =>{
        if(error){
            callback(`Unable to connect to geoLocation service!`, undefined);
        }else if(body.features.length === 0){
           callback(`Unable to locate the place, Enter a valid Address!`, undefined);
        }else {
           callback(undefined, {
               longitude: body.features[0].center[0],
               latitude: body.features[0].center[1],
               location: body.features[0].place_name
           });
        }
    })
};

module.exports = geocode;

// Not so efficient way of doing the above task

// const request = require('request');
// const chalk = require('chalk');
//
// const geocode = ( address, callback) =>{
//     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2h1YmhpMzE5OSIsImEiOiJjazR5ZGVveDgwOXB6M2x0MW1mbjhwcWExIn0.0YxCDpPtCT2vil1GgAjKgw&limit=1`;
//
//     request({ url: url, json: true}, ( error, response ) =>{
//         if(error){
//             console.log(chalk`{inverse.red Unable to connect to geoLocation service!}`);
//         }else if(response.body.features.length === 0){
//             console.log(chalk`{inverse.red Unable to locate the place, Enter a valid Address!}`)
//         }else {
//             const longitude = response.body.features[0].center[0];
//             const latitude = response.body.features[0].center[1];
//             const location = response.body.features[0].place_name;
//             console.log(`longitude: ${longitude}`);
//             console.log(`latitude: ${latitude}`);
//             console.log(`location: ${location}`);
//         }
//     })
// };
//
// geocode('delhi');
