var inpathSync = require('inpath').sync;
var execFile = require('child_process').execFile;

var ntpdc_bin = inpathSync('ntpdc');

if (!ntpdc_bin)
    throw new Error('Need to have "ntpdc" in $PATH');

function parse(data) {
    var res = {};
    var lines = data.split('\n');
    var matcher = /^([a-z ]+):\s+([0-9e.-]+)\s*([a-z]*)$/;
    lines.forEach(function (line) {
        var m = line.match(matcher);
        if (m) {
            var key = m[1].replace(/ /g, '_');
            var val = parseFloat(m[2]);
            res[key] = { value: val, unit: m[3] };
        }
    });
    return res;
}

function ntpdc(command, cb) {
    execFile(ntpdc_bin, ['-c', command], function (err, stdout, stderr) {
        if (err)
            return cb(err);

        return cb(null, parse(stdout));
    });
}

exports._parse = parse;
exports.ntpdc = ntpdc;

