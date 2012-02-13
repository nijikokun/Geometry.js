// Rectangle Object Class
// @requires Vec2d.js
// @author Nijikokun
// @license <http://aol.nexua.org>
var Rectangle = function (pos, size) {
    this.pos = pos || Vec2d(0,0);
    this.size = size || Vec2d(1,1);

    this.x = function () { 
        return this.pos.x; 
    };

    this.y = function () { 
        return this.pos.y; 
    };

    this.width = function () { 
        return this.size.x; 
    };

    this.height = function () { 
        return this.size.y;
    };

    // Generic Math

    // v: Vec2d
    this.add = function (v) {
        return new Rectangle(this.pos['+'](v), this.size);
    };

    // v: Vec2d
    this.subtract = function (v) {
        return new Rectangle(this.pos['-'](v), this.size);
    };

    // Corner / Side Aliases

    this.left = this.x;
    this.top = this.y;

    // Corner / Sides
    this.right = function () {
        return this.x() + this.width();
    };

    this.bottom = function () {
        return this.y() + this.height();
    };

    // Vector Corner / Sides

    this.topLeft = function () {
        return new Vec2d(this.left(), this.top());
    };

    this.topRight = function () {
        return new Vec2d(this.right(), this.top());
    };

    this.bottomLeft = function () {
        return new Vec2d(this.left(), this.bottom());
    };

    this.bottomRight = function () {
        return new Vec2d(this.right(), this.bottom());
    };

    // Center Algorithms

    this.centerX = function () {
        return (this.left() + this.right()) / 2;
    };

    this.centerY = function () {
        return (this.top() + this.bottom()) / 2;
    }

    this.center = function () {
        return new Vec2d(
            this.centerX(), 
            this.centerY()
        );
    };

    // Area Alias
    this.area = this.size.area;

    this.offset = function (pos, size) {
        return new Rectangle(this.pos['+'](pos), this.size['+'](size));
    };

    this.offsetFromPoints = function (x, y, w, h) {
        return this.offset(Vec2d(x,y), Vec2d(w,h));
    };

    this.inflate = function(distance) {
        return new Rectangle(
            this.pos.offset(-distance, -distance),
            this.size.offset(distance * 2, distance * 2)
        );
    }

    // Touching / Containment

    // o: Rectangle or Vec2d
    this.contains = function (o) {
        if(o.typeof) {
            if(o.typeof() == this.typeOf()) {
                return this.contains(o.topLeft()) && this.contains(o.bottomRight());
            };

            if(o.typeOf() == 'Vec2d') {
                if(o.x < this.left()) return false;
                if(o.x >= this.right()) return false;
                if(o.y < this.top()) return false;
                if(o.y >= this.bottom()) return false;

                return true;
            };
        } else return false;
    };

    this.overlaps = function (rect) {
        if(this.left() > rect.right())
            return false;
        if(this.right() < rect.left())
            return false;
        if(this.top() > rect.bottom())
            return false;
        if(this.bottom() < rect.top())
            return false;
        
        return true;
    };

    // r: Rectangle
    this.intersect = function(r) {
        return Rectangle.interset(this, r);
    }

    // r: Rectangle
    this.centerIn = function(r) {
        return Rectangle.centerIn(this, r);
    };

    // o: Object
    this.equalTo = function (o) {
        if(o.typeOf && o.typeOf() == this.typeOf())
            if(this.pos['=='](o.pos) && this.size['=='](o.size))
                return true;
        
        return false;
    };

    // o: Object
    this.notEqualTo = function (o) {
        return !this.equalTo(o);
    };

    // Aliases

    this['=='] = this.equalTo;
    this['!='] = this.notEqualTo;
    this['+'] = this.add;
    this['-'] = this.subtract;

    this.typeOf = function () {
        return 'Rectangle';
    };
};

// Utilize points vs Vec2d
Rectangle.fromPoints = function (x, y, w, h) {
    return new Rectangle(Vec2d(x, y), Vec2d(w,h));
};

// Creates a new rectangle with 1 height as long as 
// the given size starting at the top left corner.
Rectangle.row = function (pos, size) {
    return new Rectangle(pos, Vec2d(size, 1));
};

// Creates a new rectangle with 1 height as long as 
// the given size starting at the top left corner.
// Utilizes points vs Vec2d
Rectangle.row.fromPoints = function(x, y, size) {
    return Rectangle.column(Vec2d(x, y), size);
};

// Creates a new rectangle with 1 width as tall as 
// the given size starting at the top left corner.
Rectangle.column = function (pos, size) {
    return new Rectangle(pos, Vec2d(1, size));
};

// Creates a new rectangle with 1 width as tall as 
// the given size starting at the top left corner.
// Utilizes points vs Vec2d
Rectangle.column.fromPoints = function(x, y, size) {
    return Rectangle.column(Vec2d(x, y), size);
};

// Creates a new Rectangle based on the intersection of the two.
//
//      .----------.
//      | a        |
//      | .--------+----.
//      | | result |  b |
//      | |        |    |
//      '-+--------'    |
//        |             |
//        '-------------'
Rectangle.intersect = function(a, b) {
    var left = Math.max(a.left(), b.left())
    ,   right = Math.min(a.right(), b.right())
    ,   top = Math.max(a.top(), b.top())
    ,   bottom = Math.min(a.bottom(), b.bottom())
    ,   width = Math.max(0, right - left)
    ,   height = Math.max(0, bottom - top);

    return new Rectangle.fromPoints(left, top, width, height);
};

Rectangle.centerIn = function(toCenter, main) {
    var pos = main.pos['+'](
        (main.size['-'](toCenter.size))['/'](Vec2d(2,2))
    );

    return new Rectangle(pos, toCenter.size);
};

// Shorthand for Rectangle
// @alias
var Rect = Rectangle;