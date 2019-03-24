//To create some simple middleware function.
//We also want to see date and time, importing module moment (npm install moment) checkout format at: https://momentjs.com/

const moment = require('moment')
const fs = require('fs')
const path = require('path')
const fd = 1;

var logger_file = `dataout_put_${moment().format("YYYY-MM-DD")}.txt`;

const logger = (req,res,next)=>{
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    try {
        fs.appendFileSync(logger_file,`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}\n`,"UTF-8",{'flags':'a+'})
    }
    catch(error){
        console.error(error)
    }
    next();

}  

module.exports = logger;
