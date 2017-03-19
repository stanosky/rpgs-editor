'use strict';

import { h } from 'hyperapp';

const view = (model, actions) => (
  <div className="modal-card">
    <header className="modal-card-head">
      <p className="modal-card-title">Remove dialog</p>
      <button
        className="delete"
        onclick={actions.hideModal}
      ></button>
    </header>
    <section className="modal-card-body">
      <label className="label">Are you really want to remove this dialog node?</label>
    </section>
    <footer className="modal-card-foot">
      <a
        id="confirmBtn"
        data-id=""
        className="button is-warning"
        onclick={actions.commitRemoveDialogModal}
      >Delete</a>
      <a
        className="button"
        onclick={actions.hideModal}
      >No</a>
    </footer>
  </div>
);

export default view;
