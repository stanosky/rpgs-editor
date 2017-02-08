'use strict';
import {RPGSystem} from '../../../rpgs/rpgs/build/rpgs.min';

const model = {
  rpgs: new RPGSystem(),
  dialogsStage: {x: 0, y: 0},
  dragging: false,
  position: {
    x: 0, y: 0, offsetX: 0, offsetY: 0
  }
};

export default model;
