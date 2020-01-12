const request = require('request');
const chalk = require('chalk');

const forecast = ( lat, long, callback) =>{
    const url = `https://api.darksky.net/forecast/2a8eb21bbce481745faf4a864cc908ce/${lat},${long}?units=si`;

    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback(`Unable to connect to weather service!`, undefined);
        }else if(body.error){
            callback(` Unable to find location!`);
        }else {
            callback(undefined, body.currently);
        }
    });

};

module.exports = forecast;
