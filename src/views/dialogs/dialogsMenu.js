'use strict';

import { h } from 'hyperapp';
import dialogItems from './dialogItems';
import addDialog from '../modals/addDialog';

const view = (model, action) => (
  <aside className="menu side-panel">
    <nav className="panel">
      <div className="panel-block">
        <p className="control">
          <a className="button" onClick={action.showAddDialogModal}>
            <span className="icon">
              <i className="fa fa-comments-o"></i>
            </span>
            <span>New dialog</span>
          </a>
          <a
            onClick={e => action.showRemoveDialogModal(model.selectedDialog)}
            className={'button ' + (model.selectedDialog === '' ? 'is-disabled' : '')}
          >
            <span className="icon">
              <i className="fa fa-trash"></i>
            </span>
            <span>Remove dialog</span>
          </a>
        </p>
      </div>
      <div className="panel-block">
        <p className="control has-icon">
          <input className="input is-small" type="text" placeholder="Search"></input>
          <span className="icon is-small">
            <i className="fa fa-search"></i>
          </span>
        </p>
      </div>
    </nav>
    <div className="stage-menu-top-left">
      <p class="control">
        <a
          className={'button ' + (model.selectedDialog === '' ? 'is-disabled' : '')}
        >
          <span class="icon is-small">
            <i class="fa fa-commenting-o"></i>
          </span>
        </a>
      </p>
    </div>
    <div className="stage-menu-bottom-right">
      <p class="control">
        <a
          className={'button ' + (model.selectedDialog === '' ? 'is-disabled' : '')}
        >
          <span class="icon is-small">
            <i class="fa fa-plus"></i>
          </span>
        </a>
        <a
          className={'button ' + (model.selectedDialog === '' ? 'is-disabled' : '')}
        >
          <span class="icon is-small">
            <i class="fa fa-minus"></i>
          </span>
        </a>
      </p>
    </div>
    <ul class="menu-list">
      {dialogItems(model, action)}
    </ul>
  </aside>
);

export default view;
