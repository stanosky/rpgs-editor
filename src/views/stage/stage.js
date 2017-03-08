'use strict';

import { h } from 'hyperapp';
import talkNodes from '../dialogs/talkNodes';
import canvas from './canvas';

const view = (model, action) => (
  <div
    id="dialogsStage"
    className="editor-stage blueprint"
    onresize={e => action.setStageSize({
      width:e.currentTarget.scrollWidth,
      height:e.currentTarget.scrollHeight
    })}
    oncreate={action.initStage}
  >
    <div id="autoResizer" style={{
      display: 'block',
      position: 'absolute',
      width: 1+'px',
      height: 1+'px',
      top:model.stageScrollHeight - 1 + 'px',
      left:model.stageScrollWidth - 1 + 'px',
    }}>
    </div>
    {talkNodes(model, action)}
    {canvas(model, action)}    
  </div>
);

export default view;
