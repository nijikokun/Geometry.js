// Line Class
// @requires Vec2d.js
// @author Nijikokun
// @license <http://aol.nexua.org>

// a: Vec2d
// b: Vec2d
var Line = function (a, b) {
	this.a = a || Vec2d.Zero();
	this.b = b || Vec2d.One();

	console.log(this.a.toString(), this.b.toString());

	this.dx = function () {
		return this.b.x - this.a.x;
	};

	this.dy = function () {
		return this.b.y - this.a.y;
	};

	this.dot = function () {
		var dx = this.dx();
		var dy = this.dy();

		return this.dx * this.dx + this.dy * this.dy;
	};

	this.enumerateX = function(f) {
		var a = this.a, b = this.b;
		var dx = this.dx();
		var dy = this.dy();
		var derivative = 2 * dy - dx;

		// First Plot
		f(new Vec2d(a.x, a.y));

		var y = a.y;

		for(var x = a.x; x <= b.x; x++) {
			if(derivative > 0) {
				y += 1;
				f(new Vec2d(x, y));
				derivative += (2 * dy - 2 * dx);
			} else {
				f(new Vec2d(x, y));
				derivative += (2 * dy);
			}
		}
	};

	this.enumerateY = function(f) {
		var a = this.a, b = this.b;
		var dx = this.dx();
		var dy = this.dy();
		var derivative = 2 * dy - dx;

		// First Plot
		f(new Vec2d(a.x, a.y));

		var x = a.x - 1;

		for(var y = a.y; y <= b.y; y++) {
			if(derivative > 0) {
				x += 1;
				f(new Vec2d(x, y));
				derivative += (2 * dx - 2 * dy);
			} else {
				f(new Vec2d(x, y));
				derivative += (2 * dx);
			}
		}
	};

	this.length = function () {
		return Math.sqrt(this.dot());
	};

	this.slope = function() {
		return (this.b.y - this.a.y) / (this.b.x - this.a.x);
	};

	return this;
}