'use strict';

import { h } from 'hyperapp';
import addDialog from './addDialog';
import removeDialog from './removeDialog';

const modals = [
  {type: 'addDialog', view: addDialog},
  {type: 'removeDialog', view: removeDialog},
]

const view = (model, action) => (
  <div className={"modal " + (model.modalVisible ? "is-active" : "")}>
    <div className="modal-background"></div>
    {modals.map(m => m.type === model.modalType ? m.view(model, action) : '')}
  </div>
);

export default view;
