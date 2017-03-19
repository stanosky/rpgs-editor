'use strict';

import { h } from 'hyperapp';
import dialogItems from './dialogItems';

const view = (model, actions) => (
  <aside className="menu side-menu">
    <nav className="panel side-panel is-marginless">
      <div className="panel-block">
        <p className="control">
          <a className="button" onClick={e => actions.showEditDialogModal('')}>
            <span className="icon">
              <i className="fa fa-comments-o"></i>
            </span>
            <span>New</span>
          </a>
          <a
            onClick={e => actions.showEditDialogModal(model.currDialogNode.getId())}
            className={'button ' + (model.currDialogNode === null ? 'is-disabled' : '')}
          >
            <span className="icon">
              <i className="fa fa-pencil"></i>
            </span>
            <span>Edit</span>
          </a>
          <a
            onClick={actions.showRemoveDialogModal}
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
          <input
            className="input is-small"
            type="text"
            placeholder="Search"
            oninput={e => actions.filterDialogs(e.currentTarget.value)}
          ></input>
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
          onClick={e => actions.showEditTalkModal('')}
        >
          <span class="icon is-small">
            <i class="fa fa-plus"></i>
          </span>
        </a>
        <a

          className={'button ' + (model.currDialogNode === null ? 'is-disabled' : '')}
          onClick={actions.showDialogTesterModal}
        >
          <span class="icon is-small">
            <i class="fa fa-play"></i>
          </span>
        </a>
      </p>
    </div>
    <div className="stage-menu-bottom-right">
      <p class="control">
        <a
          className={'button ' + (model.currDialogNode === null ? 'is-disabled' : '')}
          onclick={actions.onZoomIn}
        >
          <span class="icon is-small">
            <i class="fa fa-search-plus"></i>
          </span>
        </a>
        <a
          className={'button ' + (model.currDialogNode === null ? 'is-disabled' : '')}
          onclick={actions.onZoomOut}
        >
          <span class="icon is-small">
            <i class="fa fa-search-minus"></i>
          </span>
        </a>
      </p>
    </div>
    <ul class="menu-list node-list">
      {dialogItems(model, actions)}
    </ul>
  </aside>
);

export default view;
