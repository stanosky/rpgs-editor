'use strict';

import { h } from 'hyperapp';

const view = (model, actions) => (
  <div class="nav-right nav-menu">
    <span class="nav-item">
      <a
        class="button is-white"
        onclick={actions.showLoadFileModal}
      >
        <span class="icon is-small">
          <i class="fa fa-upload"></i>
        </span>
        <span>Import</span>
      </a>
      <a
        class="button is-white"
        onclick={actions.saveFile}
      >
        <span class="icon is-small">
          <i class="fa fa-download"></i>
        </span>
        <span>Export</span>
      </a>
    </span>
  </div>
);

export default view;
