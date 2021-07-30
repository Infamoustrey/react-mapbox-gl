var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var diff = function (obj1, obj2) {
    var toMutate = {};
    Array.from(new Set(__spreadArray(__spreadArray([], Object.keys(obj1)), Object.keys(obj2)))).map(function (key) {
        if (obj1[key] !== obj2[key]) {
            toMutate[key] = obj2[key];
        }
    });
    return toMutate;
};
export default diff;
//# sourceMappingURL=diff.js.map