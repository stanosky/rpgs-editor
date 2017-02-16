'use strict';

import { h } from 'hyperapp';
import dialogItems from './dialogItems';
import addDialog from '../modals/addDialog';

const view = (model, action) => (
  <div id="DialogsTab" className={
    model.selectedTab === 'Dialogs' ? '' : 'is-hidden'
  }>
    <aside className="menu side-panel">
      <nav className="panel">
        <div className="panel-block">
          <button
            className="button"
            onClick={action.showAddDialogModal}
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
        {dialogItems(model, action)}
      </nav>
    </aside>
    <div className="editor-stage">

    </div>
  </div>
);

export default view;
