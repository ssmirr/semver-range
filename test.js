const semverCompare = require('./semver-range').semverCompare;
const semverDiff = require('./semver-range').semverDiff;

console.log('^2.0.0 AND ~2.0.1: ', semverCompare('^2.0.0', '~2.0.1'), '~', semverDiff('^2.0.0', '~2.0.1'));
console.log('=========================================================')
console.log( '>=2.0.0 AND >=2.0.1: ', semverCompare('>=2.0.0', '>=2.0.1'), '~', semverDiff('>=2.0.0', '>=2.0.1'));
console.log('=========================================================')
console.log('1.2.3-alpha.3 AND 1.2.3: ', semverCompare('1.2.3-alpha.3', '1.2.3'), '~', semverDiff('1.2.3-alpha.3', '1.2.3'));
console.log('=========================================================')
console.log('1.2.3 AND 1.2.3-alpha.3: ', semverCompare('1.2.3', '1.2.3-alpha.3'), '~', semverDiff('1.2.3', '1.2.3-alpha.3'));
console.log('=========================================================')
console.log('1.2.3-alpha.3 AND 2.2.3: ', semverCompare('1.2.3-alpha.3', '2.2.3'), '~', semverDiff('1.2.3-alpha.3', '2.2.3'));
console.log('=========================================================')
console.log('2.2.3 AND 1.2.3-alpha.3: ', semverCompare('2.2.3', '1.2.3-alpha.3'), '~', semverDiff('2.2.3', '1.2.3-alpha.3'));
console.log('=========================================================')
console.log('<=1.1.0 >0.2.0 AND <=0.1.1 >1.2.0: ', semverCompare('<=1.1.0 >0.2.0', '<=0.1.1 >1.2.0'), '~', semverDiff('<=1.1.0 >0.2.0', '<=0.1.1 >1.2.0'));
console.log('=========================================================')
console.log('^4.0.x AND 4.x: ', semverCompare('^4.0.x', '4.x'), '~', semverDiff('^4.0.x', '4.x'));
console.log('=========================================================')
console.log('4.0.x AND 4.x: ', semverCompare('4.0.x', '4.x'), '~', semverDiff('4.0.x', '4.x'));
console.log('=========================================================')
console.log('^4.x AND 4.0.x: ', semverCompare('4.x', '4.0.x'), '~', semverDiff('4.x', '4.0.x'));
console.log('=========================================================')
console.log('4.x AND <URL>: ', semverCompare('4.x', 'https://github.com/indexzero/forever/tarball/v0.5.6'), '~', semverDiff('4.x', 'https://github.com/indexzero/forever/tarball/v0.5.6'));
console.log('=========================================================')
console.log('<URL> AND 4.x: ', semverCompare('https://github.com/indexzero/forever/tarball/v0.5.6', '4.x'), '~', semverDiff('https://github.com/indexzero/forever/tarball/v0.5.6', '4.x'));
console.log('=========================================================')
console.log('4.0.0 AND 3.0.0: ', semverCompare('4.0.0', '3.0.0'), '~', semverDiff('4.0.0', '3.0.0'));
console.log('=========================================================')
console.log('3.0.0 AND 4.0.0: ', semverCompare('3.0.0', '4.0.0'), '~', semverDiff('3.0.0', '4.0.0'));
