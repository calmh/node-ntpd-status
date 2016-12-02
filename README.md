# This project is not actively maintained

Issues and pull requests on this repository may not be acted on in a timely
manner, or at all.  You are of course welcome to use it anyway. You are even
more welcome to fork it and maintain the results.

![Unmaintained](https://nym.se/img/unmaintained.jpg)

ntpd-status [![build status](https://secure.travis-ci.org/calmh/node-ntpd-status.png)](http://travis-ci.org/calmh/node-ntpd-status)
===========

Ask a local or remote `ntpd` for status data, using `ntpdc`.

Example
-------

```javascript
var ntpd = require('ntpd_status');

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

    console.log('loopinfo from localhost:');
    for (var key in result) {
        /*
         * 'key' is the underscored variable name as reported by ntpdc
         * 'value' is the value, as a number
         * 'unit' is the unit as string, or the empty string
         */
        console.log(key + ': ' + result[key].value + ' ' + result[key].unit);
    }
    console.log();
});

/*
 * Similarly, print kerninfo from the remote host anto.nym.se.
 */

ntpd.ntpdc('kerninfo', 'anto.nym.se', function (err, result) {
    if (err)
        throw err;

    console.log('kerninfo from anto.nym.se:');
    for (var key in result) {
        console.log(key + ': ' + result[key].value + ' ' + result[key].unit);
    }
    console.log();
});
```

License
-------

MIT

