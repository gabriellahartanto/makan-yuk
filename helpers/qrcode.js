const QRCode = require('qrcode');

function qrcode(link) {
  return QRCode.toDataURL(link)
  .then(url => {
    return url;
  })
  .catch(err => {
    console.log(err);
    throw err;
  });
}

// qrcode('https://www.npmjs.com/package/qrcode', (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// })


module.exports = qrcode;