'use strict';

import { h } from 'hyperapp';
import talkNodes from '../dialogs/talkNodes';

const view = (model, action) => (
  <div className="editor-stage blueprint">
    {talkNodes(model, action)}
  </div>
);

export default view;
