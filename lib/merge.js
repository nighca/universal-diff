/*
 * Merge diff results to origin scequence
 * By: nighca@live.cn
 */

(function(global, undefined){

    var merge = function(cnt, compareResult){
        var splitter = compareResult.splitter,
            diff = compareResult.diff,
            result = cnt.split(splitter);

        for(var i = diff.length - 1, item; i >= 0; i--){
            item = diff[i];
            result.splice.apply(result, item);
        }

        return result.join(splitter);
    };

    if(typeof module === "object" && typeof module.exports === "object"){
        module.exports = merge;
    }else{
        global.merge = merge;
    }
})(this);