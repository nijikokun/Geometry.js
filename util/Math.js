// Math Class
// Commonly used Math Equations / Functions
// @author Nijikokun
// @license <http://aol.nexua.org>

// Used by: Circle.js
if(!Math.clamp) {
    Math.clamp = function (value, min, max) {
        return Math.max(min, Math.min(max, value));
    };
};

if(!Math.randBetween) {
    Math.randBetween = function (min, max, flt) {
        var result = Math.exp(Math.random() * Math.log(max - min)) + min;
        return flt ? result : Math.round(result);
    };
}

if(!Math.normalize) {
    Math.normalize = function (value, min, max) {
        return (value - min) / (max - min);
    };
}

if(!Math.remap) {
    Math.remap = function (value, min, max, outmin, outmax) {
        return (Math.normalize(value, min, max) * (outmax - outmin)) + outmin;
    };
}