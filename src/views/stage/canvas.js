'use strict';

import { h } from 'hyperapp';
import talkNodes from '../dialogs/talkNodes';

const view = (model, actions) => {
  let scrollWidth = model.currStage !== null ? model.currStage.scrollWidth : 0;
  let scrollHeight = model.currStage !== null ? model.currStage.scrollHeight : 0;

  return (
  <canvas
    id="stage-canvas"
    className="stage-canvas"
    onCreate={actions.initCanvas}
    width={model.stageWidth}
    height={model.stageHeight}
  ></canvas>
);};

export default view;
