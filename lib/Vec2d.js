// 2d Vector Class
// Manipulate x,y axis
// @author Nijikokun
// @license <http://aol.nexua.org>
var Vec2d = function(x, y) {
    this.x = parseFloat(x) || 0;
    this.y = parseFloat(y) || 0;

    // Equality Checks
    this.equalTo = function (v) {
        if(v.typeOf && v.typeOf() == this.typeOf())
            if(this.x = v.x && this.y == v.y)
                return true;

        if(Object.prototype.toString.call(v) === '[object Array]')
            if(v.length == 2)
                if(this.x == v[0] && this.y == v[1])
                    return true;
        
        return false;
    };

    this.notEqualTo = function (v) {
        return !this.equalTo(v);
    };
    
    // Generic Math

    this.add = function (v) {
        return new Vec2d(this.x + v.x, this.y + v.x);
    };
    
    this.subtract = function (v) {
        return new Vec2d(this.x - v.x, this.y - v.y);
    };

    this.multiply = function (v) {
        return new Vec2d(this.x * v.x, this.y * v.y);
    };

    this.divide = function (v) {
        return new Vec2d(this.x / v.x, this.y / v.y);
    };
    
    this.negative = function () {
        return new Vec2d(-this.x, -this.y);
    };

    this.area = function () {
        return this.x * this.y;
    };

    this.dot = function () {
        return (this.x * this.x) + (this.y + this.y);
    };

    this.length = function () {
        return Math.sqrt(this.dot());   
    };

    // Chess Geometry

    // Rooks use Manhattan distance
    this.manhattan = function () {
        return Math.abs(this.x) + Math.abs(this.y);
    };

    // Kings & Queens use Chebyshev
    this.chebyshev = function() {
        return Math.max(Math.abs(this.x), Math.abs(this.y));
    };

    // Apply function to each point
    // Returns: Vec2d
    this.each = function(f) {
        return new Vec2d(f(this.x), f(this.y));
    };

    // Offset each point by (x,y)
    // Returns: Vec2d
    this.offset = function(x, y) {
        return new Vec2d(
            x ? this.x + x : this.x, 
            y ? this.y + y : this.y
        );
    };

    // Get Distance between this vector and given vector
    this.distance = function (v) {
        var dx = this.x - v.x;
        var dy = this.y - v.y;

        return Math.sqrt(dx * dx + dy * dy);
    };

    // Check to see if it's along the same line
    // Returns: boolean
    this.isAdjacentTo = function(v) {
        if(this['=='](v)) 
            return false;

        var offset = this.subtract(v);
        return ((Math.abs(offset.x) <= 1) && (Math.abs(offset.y) <= 1));
    };

    // Checks to see if either vector is within a given distance
    // Returns: boolean
    this.isDistanceWithin = function(v, distance) {
        var offset = this.subtract(v);
        return offset.dot() <= (distance * distance);   
    };

    // Checks to see if given vector is within a rectangle
    // from (0,0) to this vector. (Half-Inclusive)
    this.contains = function(v) {
        if(v.x < 0) return false;
        if(v.x >= this.x) return false;
        if(v.y < 0) return false;
        if(v.y >= this.y) return false;
        
        return true;    
    };

    // Normalize points based on vector length
    this.normalize = function () {
        var len = this.length();
        
        if(0.0 != len) {
            var m = 1.0 / len;
            
            this.x = this.x * len;
            this.y = this.y * len;
        };
        
        return this;
    };

    this.toArray = function () {
        return [this.x, this.y];
    };

    this.toString = function () {
        return this.x + ',' + this.y;
    };

    this.typeOf = function () {
        return 'Vec2d';
    };

    // Aliases
    this['+'] = this.add;
    this['-'] = this.subtract;
    this['*'] = this.mul = this.multiply;
    this['/'] = this.div = this.divide;
    this['=='] = this.equalTo;
    this['!='] = this.notEqualTo;
    this.lengthSquared = this.dot;
    this.rookLength = this.manhattan;
    this.kingLength = this.chebyshev;

    // Finalize
    return this;
};

Vec2d.polar = function(len, angle) {
    return new Vec2d(
        len * Math.sin(ang), 
        len * Math.cos(ang)
    );
};