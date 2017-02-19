'use strict';

import { h } from 'hyperapp';
import talkNode from '../dialogs/talkNode';

const view = (model, action) => (
  <div className="editor-stage blueprint">
    {talkNode(model, action)}
  </div>
);

export default view;
