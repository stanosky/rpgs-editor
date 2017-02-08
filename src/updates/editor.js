'use strict';

const update = {
  rpg: model => {
    model.rpgs.addNode('DialogNode',{},false)
    //console.log(model.rpgs.serializeData())
  },
  drop: model => ({ dragging: false }),
  drag: (model, { position }) => ({ dragging: true, position }),
  move: (model, { x, y }) => model.dragging ? ({
      position: {
      x: x < 0 ? 0 : x,
      y: y < 0 ? 0 : y,
      offsetX: model.position.offsetX,
      offsetY: model.position.offsetY
    }
  }) : model
};

export default update;
