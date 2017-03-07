'use strict';

const drawTriangle = (g, sx, sy, ex, ey, color) => {
  let w = (ex - sx);
  let h = (ey - sy);
  let hw = w * .5;
  let hh = h * .5;
  g.beginFill(color);
  g.drawPolyStar(sx + hw, sy + hh, 4, 3, 0, Math.atan2(h,w)*(180/Math.PI))
  g.endFill();
};

const wireOutside = (g, sx, sy, ex, ey) => {
  let hw = (sx - ex) * .5;
  let hh = (ey - sy) * .5;

  g.qt(sx, sy, sx, sy)
   .qt(sx, sy + hh, sx - hw, sy + hh)
   .qt(ex, sy + hh, ex, ey)
   .qt(ex, ey, ex, ey)
};

const wireInside = (g, sx, sy, ex, ey) => {
  let hw = (ex - sx) * .5;
  let hh = (ey - sy) * .5;
  g.mt(sx, sy)
   .qt(sx + hw, sy, sx + hw, sy + hh)
   .qt(sx + hw, ey, ex, ey)
};

const drawCricle = (g, x, y, size, color) => {
  g.beginFill(color);
  g.drawCircle(x,y,size);
  g.endFill();
}

const drawWire = (g, sx, sy, ex, ey) => {
  let color = "#000000";
  g.setStrokeStyle(1.5);
  g.beginStroke(color);
  drawCricle(g, sx, sy, 3, color);
  //console.log('bounds',bounds);
  //g.mt(sx, sy).lt(ex, ey);
  if(sx <= ex) {
    wireInside(g, sx, sy, ex, ey)
  } else {
    wireOutside(g, sx, sy, ex, ey)
  }
  g.beginFill(color);
  g.drawPolyStar(ex, ey, 4, 3, 0, 0)
  g.endFill();
  //drawTriangle(g, sx, sy, ex, ey, color)
  g.endStroke()
}

const createWire = (sx, sy, ex, ey, bounds) => {
  let wire = new createjs.Shape();
  drawWire(wire.graphics, sx, sy, ex, ey, bounds)
  return wire;
};

const mergeBounds = (b1, b2) => {
  let top = Math.min(b1.top, b2.top),
    left = Math.min(b1.left, b2.left),
    right = Math.max(b1.right, b2.right),
    bottom = Math.max(b1.bottom, b2.bottom),
    width = right - left,
    height = bottom - top;
  return {top, left, right, bottom, width, height};
};

const getDivBounds = (elementName) => {
  let elm = document.getElementById(elementName);
  return elm ? elm.getBoundingClientRect()
            : {left:0, top:0, bottom: 0, right: 0, width:0, height:0};
};

module.exports = {
  createWire,
  getDivBounds,
  mergeBounds
};
