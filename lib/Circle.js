// Circle Object class
// @requires Vec2d.js
// @requires Rectangle.js
// @requires ../Util/Math.js
// @author Nijikokun
// @license <http://aol.nexua.org>

// Center: Vec2d
// Radius: Integer
var Circle = function (center, radius) {
    var SquaredRadius = [ 0, 2, 5, 10, 18, 26, 38 ];
    this.center = center || Vec2d(0,0);
    this.radius = radius || 1;

    this.diameter = function () {
        return this.radius * 2;
    };
    
    this.circumference = function () {
        return this.diameter() * Math.PI;
    };
    
    this.area = function () {
        return this.radiusSquared() * Math.PI;
    };

    this.radiusSquared = function () {
        if(this.radius < SquaredRadius.length)
            return SquaredRadius[this.radius];
        
        return this.radius * this.radius;
    };

    // Checks whether pos is on the outer edge of the circle
    this.isEdge = function (pos) {
        var leadingEdge = true;

        if(this.radius > 0)
            leadingEdge = (pos['-'](this.center)).dot() > this.radiusSquared();

        return leadingEdge;
    };

    // Determines whether the circle intersects a rectangle.
    this.intersectRectangle = function (rect) {
        var v = new Vec2d(
            Math.clamp(this.center.x, rect.left(), rect.right()),
            Math.clamp(this.center.y, rect.top(), rect.bottom())
        );

        var direction = this.center['-'](v);
        var distance = direction.dot();

        return ((distance > 0) && (distance < this.radiusSquared()));
    }

    // Check Circle Collision
    this.collides = function (circle) {
        var dx = this.center.x - circle.center.x;
        var dy = this.center.y - circle.center.y;
        var dist = this.radius + circle.radius;

        return (dx * dx + dy * dy <= dist * dist);
    };

    this.typeOf = function () {
        return 'Circle';
    };

    return this;
};