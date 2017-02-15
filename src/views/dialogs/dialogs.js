'use strict';

import { h } from 'hyperapp';
import dialogItems from './dialogItems';
import addDialogModal from './addDialogModal';

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
    {addDialogModal(model,msg)}
  </div>
);

export default view;
