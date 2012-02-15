// Representation of Eight Directions
// @requires Vec2d.js
// @author Nijikokun
// @license <http://aol.nexua.org>
// -- Unfinished finale shed?

// Offset: Vec2d
var Direction = function (offset) {
    this.offset = offset || Vec2d(0, 0);

    // Eight Directions
    this.N  = function () { return new Direction(new Vec2d(  0, -1)); };
    this.NE = function () { return new Direction(new Vec2d(  1, -1)); };
    this.E  = function () { return new Direction(new Vec2d(  1,  0)); };
    this.SE = function () { return new Direction(new Vec2d(  1,  1)); };
    this.S  = function () { return new Direction(new Vec2d(  0,  1)); };
    this.SW = function () { return new Direction(new Vec2d( -1,  1)); };
    this.W  = function () { return new Direction(new Vec2d( -1,  0)); };
    this.NW = function () { return new Direction(new Vec2d( -1, -1)); };

    // Empty Direction
    this.None = function () { return new Direction(new Vec2d(0,0)); };

    // Math

    this.add = function (v) {
        return this.offset['+'](v);
    };

    this.equalTo = function (o) {
        if(dir.typeOf)
            if(dir.typeOf() == this.typeOf())
                return this.offset['=='](dir.offset);
            else if(dir.typeOf() == 'Vec2d')
                return this.offset['=='](dir);
        
        return false;
    };

    this.notEqualTo = function (o) {
        return !this.equalTo(o);
    };

    // Rotation

    this.clockwise = function () {
        return [ 
            this.N(),
            this.NE(),
            this.E(),
            this.SE(),
            this.S(),
            this.SW(),
            this.W(),
            this.NW()
        ];
    };

    this.counterClockwise = function () {
        return [ 
            this.N(),
            this.NW(),
            this.W(),
            this.SW(),
            this.S(),
            this.SE(),
            this.E(),
            this.NE()
        ];
    };

    // Compass Directions in the correct order
    // Ways To remember this:
    //      Never Eat Shredded Wheat
    //      Never Eat Soggy Waffles
    //      Never Entertain Sexy Women
    this.NESW = function () {
        return [ 
            this.N(),
            this.E(),
            this.S(),
            this.W(),
        ];
    };

    // Heading
    this.towards = function (pos) {
        var offset = new Vec2d(0, 0);

        if(pos.x < 0) offset.x = -1;
        if(pos.x > 0) offset.x =  1;
        if(pos.y < 0) offset.y = -1;
        if(pos.y > 0) offset.y =  1;

        return new Direction(offset);
    };

    // Enumerating
    this.next = function () {
        if(this['=='](this.N())) return this.NE();
        if(this['=='](this.NE())) return this.E();
        if(this['=='](this.E())) return this.SE();
        if(this['=='](this.SE())) return this.S();
        if(this['=='](this.S())) return this.SW();
        if(this['=='](this.SW())) return this.W();
        if(this['=='](this.W())) return this.NW();
        if(this['=='](this.NW())) return this.N();

        return this.None();
    };

    this.previous = function () {
        if(this['=='](this.N())) return this.NW();
        if(this['=='](this.NE())) return this.N();
        if(this['=='](this.E())) return this.NE();
        if(this['=='](this.SE())) return this.E();
        if(this['=='](this.S())) return this.SE();
        if(this['=='](this.SW())) return this.S();
        if(this['=='](this.W())) return this.SW();
        if(this['=='](this.NW())) return this.W();

        return this.None();
    };

    this.Rotate = {
        Left90: function () {
            return this.previous().previous();
        },

        Right90: function () {
            return this.next().next();
        }
    };

    this.Rotate180 = function () {
        return new Direction(this.offset['*'](-1,-1));
    };

    this.toString = function () {
        if(this['=='](this.N())) return 'N';
        if(this['=='](this.NE())) return 'NE';
        if(this['=='](this.E())) return 'E';
        if(this['=='](this.SE())) return 'SE';
        if(this['=='](this.S())) return 'S';
        if(this['=='](this.SW())) return 'SW';
        if(this['=='](this.W())) return 'W';
        if(this['=='](this.NW())) return 'NW';
        if(this['=='](this.None())) return 'None';

        return this.offset.toString();
    };

    // Alias
    this['+'] = this.add;
    this['=='] = this.equalTo;
    this['!='] = this.notEqualTo;

    return this;
}