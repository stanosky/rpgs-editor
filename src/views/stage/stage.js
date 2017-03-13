'use strict';

import { h } from 'hyperapp';
import talkNodes from '../dialogs/talkNodes';
import canvas from './canvas';

const view = (model, action) => {
  let scrollWidth = model.currStage !== null ? model.currStage.scrollWidth : 0;
  let scrollHeight = model.currStage !== null ? model.currStage.scrollHeight : 0;
  return (
  <div
    id="dialogsStage"
    className="editor-stage"
    onCreate={action.initStage}
  >
    <div
      className="blueprint"
      onresize={action.updateStage}
      onMouseDown={e => action.onDragHandler({
        node: null,
        event: e,
        dragType:'stage',
        wireType:''
      })}
      style={{
        position: 'relative',
        top:0,
        left:0,
        width: model.stageWidth + 'px',
        height: model.stageHeight + 'px',
        transform: 'scale('+model.currZoom+')',
        "transform-origin": '0% 0%'
      }}
    >

      {talkNodes(model, action)}
      {canvas(model, action)}
    </div>
  </div>
)};

export default view;

/*
<div id="autoResizer" style={{
  display: 'block',
  position: 'absolute',
  width: '1px',
  height: '1px',
  top:scrollHeight - 1 + 'px',
  left:scrollWidth - 1 + 'px',
}}>
</div>
 */
