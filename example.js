var ntpd = require('./lib/ntpd_status');

/*
 * Get the results of 'ntpdc -c loopinfo'.
 *
 * Prints something along the lines of:
 *
 * offset: 0.00261 s
 * frequency: -19.605 ppm
 * poll_adjust: 9 
 * watchdog_timer: 1309 s
*/

ntpd.ntpdc('loopinfo', function (err, result) {
    if (err)
        throw err;

    for (var key in result) {
        /*
         * 'key' is the underscored variable name as reported by ntpdc
         * 'value' is the value, as a number
         * 'unit' is the unit as string, or the empty string
         */
        console.log(key + ': ' + result[key].value + ' ' + result[key].unit);
    }
});
