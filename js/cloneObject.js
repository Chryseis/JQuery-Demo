function cloneObj(obj) {
    var clone;
    if (obj instanceof Object) {
        if (!(obj instanceof Function)) {
            clone = obj instanceof Array ? new Array() : new Object();
            for (var k in obj) {
                clone[k] = cloneObj(obj[k]);
            }
        } else {
            clone = obj
        }
    } else {
        clone = obj
    }
    return clone;
}

// var obj = {a: {aa: 1, bb: 2, cc: 3}, b: 2, c: 3}
// var cloneObj = cloneObj({a: {aa: 1, bb: 2, cc: 3}, b: 2, c: 3})
// cloneObj.a.aa = 2;
//
// console.log(obj, cloneObj)


var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObj(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"