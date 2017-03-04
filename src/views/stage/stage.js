'use strict';

import { h } from 'hyperapp';
import talkNodes from '../dialogs/talkNodes';

const view = (model, action) => (
  <div
    id="dialogsStage"
    className="editor-stage blueprint"
    onresize={e => action.setStageSize({
      width:e.currentTarget.scrollWidth,
      height:e.currentTarget.scrollHeight
    })}
  >
    <div id="autoResizer" style={{
      display: 'inline',
      position: 'absolute',
      width: 1+'px',
      height: 1+'px',
      top:model.stageHeight - 1 + 'px',
      left:model.stageWidth - 1 + 'px',
    }}>
    </div>
    {talkNodes(model, action)}
  </div>
);

export default view;
