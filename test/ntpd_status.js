var ntpd_status = require('../lib/ntpd_status');
var should = require('should');

describe('ntpdc-status', function () {
    it('should be able to parse ntpdc output', function () {
        var ntpdc_kerninfo = [
            'pll offset:           0 s',
            'pll frequency:        -12.230 ppm',
            'maximum error:        0.040304 s',
            'estimated error:      0.002893 s',
            'status:               0001  pll',
            'pll time constant:    6',
            'precision:            1e-06 s',
            'frequency tolerance:  512 ppm',
            'pps frequency:        0.000 ppm',
            'pps stability:        512.000 ppm',
            'pps jitter:           0.0002 s',
            'calibration interval: 4 s',
            'calibration cycles:   0',
            'jitter exceeded:      0',
            'stability exceeded:   0',
            'calibration errors:   0'].join('\n');
        var res = ntpd_status.parse(ntpdc_kerninfo);

        should.exist(res);
        should.exist(res.pll_offset);
        should.exist(res.pll_time_constant);
        should.exist(res.calibration_errors);

        res.pll_offset.value.should.equal(0);
        res.pll_offset.unit.should.equal('s');

        res.pll_frequency.value.should.equal(-12.23);
        res.pll_frequency.unit.should.equal('ppm');
        
        res.maximum_error.value.should.equal(0.040304);
        res.maximum_error.unit.should.equal('s');

        res.status.value.should.equal(1);
        res.status.unit.should.equal('pll');

        res.pll_time_constant.value.should.equal(6);
        res.pll_time_constant.unit.should.equal('');

        res.precision.value.should.equal(1e-6);
        res.precision.unit.should.equal('s');
    });
});
