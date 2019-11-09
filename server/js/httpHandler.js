const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  } else if (req.method === 'GET') {
    let direction = ['up', 'left', 'down', 'right'][Math.floor(Math.random() * 4)];
    res.writeHead(200, headers);
    res.end(direction);
    // console.log('success '+ direction)
    console.log(req.direction)
    // console.log(`[Success] Direction GET `)
  }
  next(); // invoke next() at the end of a request to help with testing!
};
