'use strict' 
import { Dimensions } from 'react-native'
const dimensions = Dimensions.get('window')

const SIGN_REGEXP = /([yMdhsm])(\1*)/g;
const DEFAULT_PATTERN = 'yyyy-MM-dd';
const percentNum = [
    'height',
    'width', 
]

function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
}

function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

function setAttribute(source = {}, tag = {}) {
    for (let key in source) {
        if (tag[key] !== void 0) {
            if (isPlainObject(tag[key]))
                setAttribute(source[key], tag[key])
            else
                tag[key] = source[key]
        }
    }
    
    return tag
}

function trimAll(str) {
    return str.replace(/\s/g, "")
}
function toArray(obj) {

    if (!obj) {  
        return []
    } else if (obj instanceof Array) {
        return obj
    } else if (typeof obj === 'string') {
        return trimAll(obj).split(',')
    } else if (typeof obj === 'number') {
        return [obj + '']
    } else if (isPlainObject(obj)) { //prop: label
        let back = [] 

        for (let i in obj) {
            let sub = {
                value: i + '',
                label: obj[i]
            }
            back.push(sub)
        }
        return back
    }

    return []

}

function correctOption(options) {
    let ops = toArray(options)
    if (ops.length === 0 || isPlainObject(ops[0]))
        return ops
    return ops.map(o => {
        return {
            value: o,
            label: o + ''
        }
    })
}

const resetStyle = (style = {}) => {
    let newStyle = {}
    for (let i in style) { 
        if (percentNum.includes(i)) { 
            newStyle[i] = typeof style[i] === 'number' ? style[i] : dimensions[i] * (parseInt(style[i]) / 100)
        } else if (i === 'align') {
            newStyle.justifyContent = style[i]
            newStyle.alignItems = style[i]
        } else if (i === 'paddingLR') {
            newStyle.paddingLeft = style[i]
            newStyle.paddingRight = style[i]
        } else if (i === 'paddingTB') {
            newStyle.paddingTop = style[i]
            newStyle.paddingBottom = style[i]
        } else if (i === 'marginTB') {
            newStyle.marginTop = style[i]
            newStyle.marginBottom = style[i]
        } else if (i == 'marginLR') {
            newStyle.marginLeft = style[i]
            newStyle.marginRight = style[i]
        } else {
            newStyle[i] = style[i]
        }
    }
    return newStyle
}

const makeStyle = (style, ...props) => {
    style = resetStyle(style)  
    let newStyle = {}
    if (style !== void 0) {
        for (let prop of props) { 
            if (style[prop] !== void 0) {
                newStyle[prop] = style[prop]
            }
        }
    }   
    return newStyle
}

const formatDate = {
        format: function(date, pattern) {
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function($0) {
                switch ($0.charAt(0)) {
                    case 'y':
                        return padding(date.getFullYear(), $0.length);
                    case 'M':
                        return padding(date.getMonth() + 1, $0.length);
                    case 'd':
                        return padding(date.getDate(), $0.length);
                    case 'w':
                        return date.getDay() + 1;
                    case 'h':
                        return padding(date.getHours(), $0.length);
                    case 'm':
                        return padding(date.getMinutes(), $0.length);
                    case 's':
                        return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function(dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y':
                            _date.setFullYear(_int);
                            break;
                        case 'M':
                            _date.setMonth(_int - 1);
                            break;
                        case 'd':
                            _date.setDate(_int);
                            break;
                        case 'h':
                            _date.setHours(_int);
                            break;
                        case 'm':
                            _date.setMinutes(_int);
                            break;
                        case 's':
                            _date.setSeconds(_int);
                            break;
                    }
                }
                return _date;
            }
            return null
        }
    }
function startWith(value = "", ...options) { 
    for (let option of options) {
        if (value.indexOf(option) === 0)
            return true
    }
    return false
}
function eqArray(arr1, arr2) {
    if (arr1.length !== arr1.length) {
        return false
    } else { 
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false
            }
        }
        return true;
    }
}
function equals(obj1, obj2) { 

    if (obj1 === obj2) {
        return true
    }
    
    if (typeof obj1 !== typeof obj2)
        return false
    
    if (['number', 'string', 'null', 'undefined'].includes(typeof obj1))   {
        return  obj1 == obj2
    }
    if (typeof obj1 == 'boolean') {
        return obj1 == !!obj2
    }
    if (Array.isArray(obj1)) {
        if (Array.isArray(obj2))
            return eqArray(obj1, obj2)
        else return false
    }
    
    var tempA = Object.getOwnPropertyNames(obj1);
    var tempB = Object.getOwnPropertyNames(obj2);

    if (tempA.length != tempB.length) {
        return false;
    }

    for (var i = 0; i < tempA.length; i++) {
        var propName = tempA[i];

        if (obj1[propName] !== obj2[propName]) {
            return false;
        }
    }
    return true;
    
}

function clone(obj) {
    var copy;
 
    if (null == obj || "object" != typeof obj) return obj;

    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) 
                copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.")
}

export default { 
    formatDate, 
    makeStyle,
    resetStyle, 
    correctOption, 
    setAttribute, 
    isPlainObject, 
    startWith,
    equals,
    clone
}