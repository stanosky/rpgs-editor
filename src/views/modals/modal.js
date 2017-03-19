'use strict';

import { h } from 'hyperapp';

const view = (model, actions) => (
  <div className={"modal " + (model.modalVisible ? "is-active" : "")}>
    <div className="modal-background"></div>
    {model.modalView !== null ? model.modalView(model, actions) : ''}
  </div>
);

export default view;
