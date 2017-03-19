'use strict';

import { h } from 'hyperapp';
import factory from './modalFactory';

const view = (model, actions) => {
  let modalView = factory(model.modalView);
  return (
    <div className={"modal " + (model.modalVisible ? "is-active" : "")}>
      <div className="modal-background"></div>
      {modalView !== null ? modalView(model, actions) : ''}
    </div>
  );
}

export default view;
