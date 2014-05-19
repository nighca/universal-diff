(function(global, undefined){

    var compare = function(cnt1, cnt2, splitter){
        var SPLITTER = splitter || '',

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
        var arr1 = cnt1.split(SPLITTER),
            arr2 = cnt2.split(SPLITTER);

        var N = arr1.length,
            M = arr2.length,
            MAX = N + M,
            steps = Array.apply(null, {length: M+N+1}).map(function(){return [];}),
            furthestReaching = [],
            dist = -1;

        furthestReaching[MAX + 1] = 0;

        // caculate min distance & log each step
        for(var D = 0; D <= MAX && dist === -1; D++){
            for(var k = -D, x, y, step; k <= D && dist === -1; k+=2){
                if(k === -D || (k !== D && furthestReaching[k - 1 + MAX] < furthestReaching[k + 1 + MAX])){
                    x = furthestReaching[k + 1 + MAX];
                    step = STEP_INSERT;
                }else{
                    x = furthestReaching[k - 1 + MAX] + 1;
                    step = STEP_REMOVE;
                }

                y = x - k;
                steps[x][y] = step;

                while(x < N && y < M && arr1[x] === arr2[y]){
                    x++;
                    y++;
                    steps[x][y] = STEP_NOCHANGE;
                }

                furthestReaching[k + MAX] = x;

                if(x >= N && y >= M){
                    dist = D;
                }
            }
        }

        // get contrast arrays (src & target) by analyze step by step
        var src = [], target = [];

        for(var i = N,j = M; i > 0 || j > 0;){
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
    }else{
        global.compare = compare;
    }
})(this);