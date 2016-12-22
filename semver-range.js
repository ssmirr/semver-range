const semver = require('semver');

/**
 * semver{1|2} can be a range, comparator, or just a simple semantic version
 * This compares the upper bounds.
 * Returns 'upgraded' if semver1 < emver2 (at any point)
 * Returns 'not_changed' if semver1 = semver2
 * Returns 'downgraded' if semver1 > semver2.
 * Returns 'prerelease'  if prerelease version
 * Returns 'url' if URL/path
 * Returns 'other' if other  
 * 
 * @param {String} semver1
 * @param {String} semver2
 * @return {String} 
 */
exports.semverCompare = function (semver1, semver2) {
    // semver1 is in the format (\d+.\d+.\d+)
    if (semver1.search(/(\d+.\d+.\d+)/) === 0) {
        var Upper1 = semver1;
        var Lower1 = semver1;
    }
    // semver1 is a range or other format (not only a version like 1.0.0)
    else {
        if (semver1.search(/(\/)/) != -1) {
            return 'url'; // URL/path
        }
        else if (semver1.search(/(alpha|beta)/) != -1) {
            return 'prerelease'; // prerelease versioning
        }
        else if (semver1.search(/(\d+.\d+.\d+)/ != -1)) {
            try {
                let semver1Slice = semver.toComparators(semver1)[0];
                if (semver1Slice[1]) {
                    var Upper1 = semver1Slice[1].match(/(>|<|<=|>=)(\d+.\d+.\d+)/m)[2];
                }
                if (semver1Slice[0]) {
                    var Lower1 = semver1Slice[0].match(/(>|<|<=|>=)(\d+.\d+.\d+)/m)[2];
                }
            } catch (error) {
                return 'other';
            }
        }
        else {
            return 'other';
        }
    }

    // semver2 is in the format (\d+.\d+.\d+)    
    if (semver2.search(/(\d+.\d+.\d+)/) === 0) {
        var Upper2 = semver2;
        var Lower2 = semver2;
    }
    // semver1 is a range or other format
    else {
        if (semver2.search(/(\/)/) != -1) {
            return 'url'; // URL/path
        }
        else if (semver2.search(/(alpha|beta)/) != -1) {
            return 'prerelease'; // prerelease versioning
        }
        else if (semver2.search(/(\d+.\d+.\d+)/ != -1)) {
            try {
                let semver2Slice = semver.toComparators(semver2)[0];
                if (semver2Slice[1]) {
                    var Upper2 = semver2Slice[1].match(/(>|<|<=|>=)(\d+.\d+.\d+)/m)[2];
                }
                if (semver2Slice[0]) {
                    var Lower2 = semver2Slice[0].match(/(>|<|<=|>=)(\d+.\d+.\d+)/m)[2];
                }
            } catch (error) {
                return 'other';
            }
        }
        else {
            return 'other';
        }
    }

    // At this point Upper{1|2}, and Lower{1|2} should be known (if they exist)

    if (Upper1 != undefined) {
        if (Upper2 != undefined) {
            try {
                if (semver.lt(Upper1, Upper2)) {
                    return 'upgraded';
                }
                else if (semver.gt(Upper1, Upper2)) {
                    return 'downgraded';
                }
            } catch (error) {
                return 'other'
            }
        } else {
            return 'upgraded';
        }
    } else if (Upper2 != undefined) {
        // Second parameter has upper bound so it interpreted as a downgrade
        return 'downgraded';
    }

    if (Lower1 != undefined) {
        if (Lower2 != undefined) {
            try {
                if (semver.lt(Lower1, Lower2)) {
                    if (semver.gt(Lower1, Lower2)) {
                        return 'other';
                    }
                    return 'upgraded';
                }
            } catch (error) {
                return 'other';
            }
        }
    }
    return 'not_changed'; // If not any conditions above I assume they are equal
}

/**
 * semver{1|2} can be a range, comparator, or just a simple semantic version
 * This returns an output similar to the official semver.diff();
 *
 * How it works: 
 *     returns semver.diff(Upper1, Upper2) if both Upper1 and Upper2 exist
 *      otherwise semver.diff(Lower1, Lower2) if both Lower1 and Lower2 exist
 *      if the diff was not possible to find return 'other'
 * 
 * Note: if the version is not changed it returns 'other'
 * 
 * @param {String} semver1
 * @param {String} semver2
 * @return {String} {'major' | 'premajor' | 'minor' | 'preminor' | 'patch' | 'prepatch' | 'prerelease' | 'url' | 'other'}
 */
exports.semverDiff = function (semver1, semver2) {
    // semver1 is in the format (\d+.\d+.\d+)
    if (semver1.search(/(\d+.\d+.\d+)/) === 0) {
        var Upper1 = semver1;
        var Lower1 = semver1;
    }
    // semver1 is a range or other format (not only a version like 1.0.0)
    else {
        if (semver1.search(/(\/)/) != -1) {
            return 'url'; // URL/path
        }
        else if (semver1.search(/(alpha|beta)/) != -1) {
            return 'prerelease'; // prerelease versioning
        }
        else if (semver1.search(/(\d+.\d+.\d+)/ != -1)) {
            try {
                let semver1Slice = semver.toComparators(semver1)[0];
                if (semver1Slice[1]) {
                    var Upper1 = semver1Slice[1].match(/(>|<|<=|>=)(\d+.\d+.\d+)/m)[2];
                }
                if (semver1Slice[0]) {
                    var Lower1 = semver1Slice[0].match(/(>|<|<=|>=)(\d+.\d+.\d+)/m)[2];
                }
            } catch (error) {
                return 'other';
            }
        }
        else {
            return 'other';
        }
    }

    // semver2 is in the format (\d+.\d+.\d+)    
    if (semver2.search(/(\d+.\d+.\d+)/) === 0) {
        var Upper2 = semver2;
        var Lower2 = semver2;
    }
    // semver1 is a range or other format
    else {
        if (semver2.search(/(\/)/) != -1) {
            return 'url'; // URL/path
        }
        else if (semver2.search(/(alpha|beta)/) != -1) {
            return 'prerelease'; // prerelease versioning
        }
        else if (semver2.search(/(\d+.\d+.\d+)/ != -1)) {
            try {
                let semver2Slice = semver.toComparators(semver2)[0];
                if (semver2Slice[1]) {
                    var Upper2 = semver2Slice[1].match(/(>|<|<=|>=)(\d+.\d+.\d+)/m)[2];
                }
                if (semver2Slice[0]) {
                    var Lower2 = semver2Slice[0].match(/(>|<|<=|>=)(\d+.\d+.\d+)/m)[2];
                }
            } catch (error) {
                return 'other';
            }
        }
        else {
            return 'other';
        }
    }

    // At this point I know Upper{1|2} and Lower{1|2} (if they exist)

    if (Upper1 != undefined) {
        if (Upper2 != undefined) {
            try {
                const diff = semver.diff(Upper1, Upper2);
                if (diff != null)
                    return diff;
            } catch (error) {
                return 'other'
            }
        } else {
            return 'other'; // This is potentially an upgrade but returning as other since we don't know the amount
        }
    } else if (Upper2 != undefined) {
        // Second parameter has upper bound so it interpreted as a downgrade
        return 'other';
    }

    if (Lower1 != undefined) {
        if (Lower2 != undefined) {
            if (semver.lt(Lower1, Lower2)) {
                if (semver.gt(Lower1, Lower2)) {
                    return 'other';
                }
                try {
                    const diff = semver.diff(Lower1, Lower2);
                    if (diff === null)
                        return 'other';
                } catch (error) {
                    return 'other';
                }
            }
        }
    }
    return 'other'; // If not any conditions above I assume they are equal
}
