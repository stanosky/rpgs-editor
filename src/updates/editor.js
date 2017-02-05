'use strict';

const update = {
  rpg: model => {
    model.rpgs.addNode('DialogNode',{},false);
    console.log(model.rpgs.serializeData())
  },
  drop: model => ({ dragging: false }),
  drag: (model, { position }) => ({ dragging: true, position }),
  move: (model, { x, y }) => model.dragging
        ? ({ position: { x, y } })
        : model
};

export default update;
