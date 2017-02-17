'use strict';

import { h } from 'hyperapp';
import addDialog from './addDialog';

const modals = [
  {type: 'addDialog', view: addDialog}
]

const view = (model, action) => (
  <div className={"modal " + (model.modalVisible ? "is-active" : "")}>
    <div className="modal-background"></div>
    {modals.map(m => m.type === model.modalType ? m.view(model, action) : '')}
  </div>
);

export default view;
