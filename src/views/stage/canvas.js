'use strict';

import { h } from 'hyperapp';
import talkNodes from '../dialogs/talkNodes';

const view = (model, action) => {
  let scrollWidth = model.currStage !== null ? model.currStage.scrollWidth : 0;
  let scrollHeight = model.currStage !== null ? model.currStage.scrollHeight : 0;

  return (
  <canvas
    id="stage-canvas"
    className="stage-canvas"
    onCreate={action.initCanvas}
    width={model.stageWidth}
    height={model.stageHeight}
  ></canvas>
);};

export default view;
