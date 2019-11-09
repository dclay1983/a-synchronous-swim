const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue.js');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

const mime = {
  jpg: 'image/jpeg',
  png: 'image/png',
};

// let messageQueue = null;
// module.exports.initialize = (queue) => {
//   messageQueue = queue;
// };

module.exports.router = (req, res, next = ()=>{}) => {
  // console.log(req);
  if (req.method === 'GET') {
    const reqUrl = req.url.toString().split('?')[1];
    if (reqUrl === 'direction') {
      let message = messageQueue.dequeue();
      message = message || 'wait';
      res.writeHead(200, headers);
      res.end(message);
      next();
    } else if (reqUrl === 'background.jpg') {
      let file = exports.backgroundImageFile;
      let stream = fs.createReadStream(file);
      console.log(stream);
      stream.on('open', function () {
        // res.setHeader('content-type', 'image/jpeg');
        res.writeHead(200, headers);
        stream.pipe(res);
        res.end()
        next();
      });
      stream.on('error', function () {
        res.writeHead(404, headers);
        res.end();
        next();
      })
    }
    // console.log(req.url.toString())
    // console.log(`[Success] Direction GET `)
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    next()
  }

};
