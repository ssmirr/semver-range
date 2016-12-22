# semver-range

npm package (research tool) to help with comparison of semantic version ranges ([semver](http://semver.org/)).
  - semver-range.Comparison categorize changes into upgrade, downgrade, not changed, prerelease, url, and other.
  - semver-range.Diff categorizes changes into major, premajor, minor, premino, patch, prepatch, prerelease, url, and other

For example you can use this tool if you want to compare `^4.0.x` and `4.x` which is technically no change in the version.

### Example usage:
``` javascript
const semverCompare = require('./semver-range').semverCompare;
const semverDiff = require('./semver-range').semverDiff;

console.log('^4.0.x AND 4.x: ', semverCompare('^4.0.x', '4.x'), '~', semverDiff('^4.0.x', '4.x'));

// output:
// ^4.0.x AND 4.x:  not_changed ~ other
```

see `test.js` for more examples, and run `npm test` to print examples to stdout.

### Note:
In some cases it's hard to tell if a change of version will actually result in an upgrade or downgrade and it can be different depending on the package.
To resolve this issue I made some assumptions which you should consider if you use this package. It is as described bellow:
When comparing v1 and v2, _Each range has an upper bound and a lower bound_.
- If `v2.upper` is decreased and `v2.lower` is increased it can be upgrade or downgrade depending on the latest version of that specific package o
n npm.
- If `v1` or `v2` is a `latest`, `stable`, etc then it will be categorized as 'other'!
- Upgrade = When `v2.lower` and/or `v2.upper` is increased (May not be an upgrade depending on latest version of that specific package o
n npm.)
- Downgrade = When `v2.upper` is decreased (May not be an downgrade depending on latest version of that specific package o
n npm.)


TO-DO:
  - Refactoring
  - More test cases
