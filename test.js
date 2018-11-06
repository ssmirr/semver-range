const semverCompare = require('./semver-range').semverCompare;
const semverDiff = require('./semver-range').semverDiff;

const assert = require('assert');

describe('Semver range comparisons', function () {
    
    it('^2.0.0 -> ~2.0.1 is a major downgrade', function () {
        assert.equal(semverCompare('^2.0.0', '~2.0.1'), 'downgraded');
        assert.equal(semverDiff('^2.0.0', '~2.0.1'), 'major');
    });

    it('>=2.0.0 -> >=2.0.1 is an upgrade', function () {
        assert.equal(semverCompare('>=2.0.0', '>=2.0.1'), 'upgraded');
        assert.equal(semverDiff('>=2.0.0', '>=2.0.1'), 'other');
    });

    it('1.2.3-alpha.3 -> 1.2.3 is a prerelease upgrade', function () {
        assert.equal(semverCompare('1.2.3-alpha.3', '1.2.3'), 'upgraded');
        assert.equal(semverDiff('1.2.3-alpha.3', '1.2.3'), 'prerelease');
    });

    it('1.2.3 -> 1.2.3-alpha.3 is a prerelease downgrade', function () {
        assert.equal(semverCompare('1.2.3', '1.2.3-alpha.3'), 'downgraded');
        assert.equal(semverDiff('1.2.3', '1.2.3-alpha.3'), 'prerelease');
    });

    it('1.2.3-alpha.3 -> 2.2.3 is a major upgrade', function () {
        assert.equal(semverCompare('1.2.3-alpha.3', '2.2.3'), 'upgraded');
        assert.equal(semverDiff('1.2.3-alpha.3', '2.2.3'), 'premajor');
    });

    it('2.2.3 -> 1.2.3-alpha.3 is a premajor downgrade', function () {
        assert.equal(semverCompare('2.2.3', '1.2.3-alpha.3'), 'downgraded');
        assert.equal(semverDiff('2.2.3', '1.2.3-alpha.3'), 'premajor');
    });

    it('<=1.1.0 >0.2.0  ->  <=0.1.1 >1.2.0 is a major upgrade', function () {
        assert.equal(semverCompare('<=1.1.0 >0.2.0', '<=0.1.1 >1.2.0'), 'upgraded');
        assert.equal(semverDiff('<=1.1.0 >0.2.0', '<=0.1.1 >1.2.0'), 'major');
    });

    it('^4.0.x -> 4.x is not_changed', function () {
        assert.equal(semverCompare('^4.0.x', '4.x'), 'not_changed');
        assert.equal(semverDiff('^4.0.x', '4.x'), 'other');
    });

    it('4.0.x -> 4.x is a major upgrade', function () {
        assert.equal(semverCompare('4.0.x', '4.x'), 'upgraded');
        assert.equal(semverDiff('4.0.x', '4.x'), 'major');
    });

    it('^4.x -> 4.0.x is a major downgrade', function () {
        assert.equal(semverCompare('4.x', '4.0.x'), 'downgraded');
        assert.equal(semverDiff('4.x', '4.0.x'), 'major');
    });

    it('4.x -> <URL> is url', function () {
        assert.equal(semverCompare('4.x', 'https://github.com/indexzero/forever/tarball/v0.5.6'), 'url');
        assert.equal(semverDiff('4.x', 'https://github.com/indexzero/forever/tarball/v0.5.6'), 'url');
    });

    it('<URL> -> 4.x is url', function () {
        assert.equal(semverCompare('https://github.com/indexzero/forever/tarball/v0.5.6', '4.x'), 'url');
        assert.equal(semverDiff('https://github.com/indexzero/forever/tarball/v0.5.6', '4.x'), 'url');
    });

    it('4.0.0 -> 3.0.0 is a major downgrade', function () {
        assert.equal(semverCompare('4.0.0', '3.0.0'), 'downgraded');
        assert.equal(semverDiff('4.0.0', '3.0.0'), 'major');
    });

    it('3.0.0 AND 4.0.0 is a major upgrade', function () {
        assert.equal(semverCompare('3.0.0', '4.0.0'), 'upgraded');
        assert.equal(semverDiff('3.0.0', '4.0.0'), 'major');
    });
});
