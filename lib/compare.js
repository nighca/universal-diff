/*
 * Simple compare
 * By: nighca@live.cn
 */

var compare = function(cnt1, cnt2, splitter){
    var SPLITTER = typeof splitter === 'string' ? splitter : '',

        MARK_EMPTY = -1,
        MARK_SAME = 0,

        STEP_NOCHANGE = 0,
        STEP_REPLACE = 1,
        STEP_REMOVE = 2,
        STEP_INSERT = 3;

    // result object
    var diff = [],
        result = {
            splitter: SPLITTER,
            diff: diff
        };

    // if string equal
    if(cnt1 === cnt2){
        return result;
    }

    // convert string to array
    var arr1, arr2;
    if(typeof splitter === 'function'){
        arr1 = splitter(cnt1);
        arr2 = splitter(cnt2);
    }else{
        arr1 = cnt1.split(SPLITTER);
        arr2 = cnt2.split(SPLITTER);
    }

    // caculate min distance & log each step
    var l1 = arr1.length,
        l2 = arr2.length,
        dists = Array.apply(null, {length: l1 + 1}).map(function(){return [];}),
        steps = Array.apply(null, {length: l1 + 1}).map(function(){return [];}),
        i, j;

    for(i = 0; i <= l1; i++){
        for(j = 0; j <= l2; j++){

            if(i === 0 || j === 0){
                dists[i][j] = i || j;
                steps[i][j] = i > 0 ? STEP_REMOVE : STEP_INSERT;

            }else{
                var equal = arr1[i-1] === arr2[j-1],

                    removeDist = dists[i-1][j] + 1,
                    insertDist = dists[i][j-1] + 1,
                    replaceDist = dists[i-1][j-1] + (equal ? 0 : 1),
                    dist = Math.min(replaceDist, removeDist, insertDist);

                dists[i][j] = dist;

                switch(dist){
                
                case replaceDist:
                    steps[i][j] = equal ? STEP_NOCHANGE : STEP_REPLACE;
                    break;
                
                case removeDist:
                    steps[i][j] = STEP_REMOVE;
                    break;
                
                case insertDist:
                    steps[i][j] = STEP_INSERT;

                }
            }
        }
    }

    // get contrast arrays (src & target) by analyze step by step
    var src = [], target = [];

    for(i = l1,j = l2; i > 0 || j > 0;){
        switch(steps[i][j]){

        case STEP_NOCHANGE:
            src.unshift(arr1[i-1]);
            target.unshift(MARK_SAME);
            i -= 1;
            j -= 1;
            break;

        case STEP_REPLACE:
            src.unshift(arr1[i-1]);
            target.unshift(arr2[j-1]);
            i -= 1;
            j -= 1;
            break;

        case STEP_REMOVE:
            src.unshift(arr1[i-1]);
            target.unshift(MARK_EMPTY);
            i -= 1;
            j -= 0;
            break;

        case STEP_INSERT:
            src.unshift(MARK_EMPTY);
            target.unshift(arr2[j-1]);
            i -= 0;
            j -= 1;
            break;

        }
    }

    // convert contrast arrays to diff array
    var l = target.length,
        start, len, to,
        notEmpty = function(s){return s !== MARK_EMPTY;};

    for(i = l - 1; i >= 0;){
        // join continuous diffs
        for(j = i; target[j] !== MARK_SAME && j >= 0; j--){}

        if(j < i){
            start = src.slice(0, j + 1).filter(notEmpty).length;            // start pos of diffs (on src)
            len = src.slice(j + 1, i + 1).filter(notEmpty).length;          // length should be replaced (on src)
            to = target.slice(j + 1, i + 1).filter(notEmpty).join(SPLITTER);// new content

            diff.unshift([start, len, to]);
        }

        i = j - 1;
    }

    return result;
};

if(typeof module === "object" && typeof module.exports === "object"){
    module.exports = compare;
}
