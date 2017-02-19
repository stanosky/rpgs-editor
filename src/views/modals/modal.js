'use strict';

import { h } from 'hyperapp';

const view = (model, action) => (
  <div className={"modal " + (model.modalVisible ? "is-active" : "")}>
    <div className="modal-background"></div>
    {model.modalView !== null ? model.modalView(model, action) : ''}
  </div>
);

export default view;
