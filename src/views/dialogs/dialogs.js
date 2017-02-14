'use strict';

import { h } from 'hyperapp';
import dialogItems from './dialogItems'

const view = (model, msg) => (
  <div id="DialogsTab" className={
    model.selectedTab === 'Dialogs' ? '' : 'is-hidden'
  }>
    <aside className="menu side-panel">
      <nav className="panel">
        <div className="panel-block">
          <button
            className="button"
            onClick={msg.showAddDialogModal}
          >New dialog</button>
        </div>
        <div className="panel-block">
          <p className="control has-icon">
            <input className="input is-small" type="text" placeholder="Search"></input>
            <span className="icon is-small">
              <i className="fa fa-search"></i>
            </span>
          </p>
        </div>
        {dialogItems(model, msg)}
      </nav>
    </aside>
    <div className="editor-stage">

    </div>
    <div class={"modal" + (model.isAddDialogVisible ? "is-active" : "")}>
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Set label</p>
          <button
            class="delete"
            onclick={msg.hideAddDialogModal}
          ></button>
        </header>
        <section class="modal-card-body">

        </section>
        <footer class="modal-card-foot">
          <a
            class="button is-success"
            onclick={msg.addDialog}
          >Ok</a>
          <a
            class="button"
            onclick={msg.hideAddDialogModal}
          >Cancel</a>
        </footer>
      </div>
    </div>
  </div>
);

export default view;
