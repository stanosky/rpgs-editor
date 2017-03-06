'use strict';

import { h } from 'hyperapp';
import talkNodes from '../dialogs/talkNodes';

const view = (model, action) => (
  <canvas
    id="stage-canvas"
    className="stage-canvas"
    oncreate={action.initCanvas}
    width={model.stageScrollWidth}
    height={model.stageScrollHeight}
  ></canvas>
);

export default view;
