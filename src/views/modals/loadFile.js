'use strict';

import { h } from 'hyperapp';

const view = (model, action) => (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Load file</p>
        <button
          className="delete"
          onclick={action.hideModal}
        ></button>
      </header>
      <section className="modal-card-body">
        <label className="label">Choose file</label>
        <p className="control has-icon has-icon-right">
          <input
            id="selectFiles"
            className="input"
            type="file"
          ></input>
        </p>
      </section>
      <footer className="modal-card-foot">
        <a
          className={"button " + (model.loadingFile ? "is-loading" : "")}
          onclick={action.loadFile}
        >Load</a>
        <a
          className="button"
          onclick={action.hideModal}
        >Cancel</a>
      </footer>
    </div>
);

export default view;
