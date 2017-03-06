'use strict';

const createWire = (sx, sy, ex, ey) => {
  let hx = sx + (ex - sx) * .5;
  let hy = sy + (ey - sy) * .5;
  let wire = new createjs.Shape();
  wire.graphics.setStrokeStyle(3);
  wire.graphics.beginStroke("#00D1B2");
  wire.graphics.beginFill("#00D1B2")
  wire.graphics.drawCircle(sx,sy,5)
  wire.graphics.endFill()
  wire.graphics.mt(sx,sy)
  wire.graphics.qt(hx,sy,hx,hy)
  wire.graphics.mt(hx,hy)
  wire.graphics.qt(hx,ey,ex,ey)
  wire.graphics.endStroke()
  return wire;
};

const getDivBounds = (elementName) => {
  let elm = document.getElementById(elementName);
  let rect = elm ? elm.getBoundingClientRect() : {left:0,top:0,width:0,height:0};
  return {
    x: rect.left,
    y: rect.top,
    w: rect.width,
    h: rect.height
  };
};

module.exports = {
  createWire,
  getDivBounds
};
