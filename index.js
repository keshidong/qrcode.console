var QRCode = require('./libs/qrcode');
var extend = require('util')._extend;
var colors = require('colors');

var consoleQRcode = function (options) {
    var qrcodeStr = '';
    var QRErrorCorrectLevel = {
        L : 1,
        M : 0,
        Q : 3,
        H : 2
    };

    if (typeof options === 'string') {
        options	= {text: options};
    }
    // set default values
    // typeNumber < 1 for automatic calculation
    options = extend({
        typeNumber	    : -1,
        correctLevel    : QRErrorCorrectLevel.M
    }, options);

    var qrcode	= new QRCode(options.typeNumber, options.correctLevel);
    qrcode.addData(options.text);
    qrcode.make();

    for( var row = 0; row < qrcode.getModuleCount(); row++ ) {
        for( var col = 0; col < qrcode.getModuleCount(); col++ ) {
            qrcodeStr += qrcode.isDark(row, col) ? '\u2003' : '\u2003'.bgWhite;
        }
        qrcodeStr += '\n';
    }

    return qrcodeStr;
}

exports = module.exports = consoleQRcode;