'use strict';

import { h } from 'hyperapp';
import dialogItems from './dialogItems';
import addDialog from '../modals/addDialog';

const view = (model, action) => (
  <aside className="menu side-menu">
    <nav className="panel side-panel is-marginless">
      <div className="panel-block">
        <p className="control">
          <a className="button" onClick={e => action.showEditDialogModal(null)}>
            <span className="icon">
              <i className="fa fa-comments-o"></i>
            </span>
            <span>New</span>
          </a>
          <a
            onClick={e => action.showEditDialogModal(model.currDialogNode)}
            className={'button ' + (model.currDialogNode === null ? 'is-disabled' : '')}
          >
            <span className="icon">
              <i className="fa fa-pencil"></i>
            </span>
            <span>Edit</span>
          </a>
          <a
            onClick={action.showRemoveDialogModal}
            className={'button ' + (model.currDialogNode === null ? 'is-disabled' : '')}
          >
            <span className="icon">
              <i className="fa fa-trash"></i>
            </span>
            <span>Remove</span>
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
          className={'button ' + (model.currDialogNode === null ? 'is-disabled' : '')}
          onClick={e => action.showEditTalkModal('')}
        >
          <span class="icon is-small">
            <i class="fa fa-plus"></i>
          </span>
        </a>
      </p>
    </div>
    <div className="stage-menu-bottom-right">
      <p class="control">
        <a
          className={'button ' + (model.currDialogNode === null ? 'is-disabled' : '')}
        >
          <span class="icon is-small">
            <i class="fa fa-search-plus"></i>
          </span>
        </a>
        <a
          className={'button ' + (model.currDialogNode === null ? 'is-disabled' : '')}
        >
          <span class="icon is-small">
            <i class="fa fa-search-minus"></i>
          </span>
        </a>
      </p>
    </div>
    <ul class="menu-list node-list">
      {dialogItems(model, action)}
    </ul>
  </aside>
);

export default view;
