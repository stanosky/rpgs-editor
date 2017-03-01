'use strict';

import { h } from 'hyperapp';

const view = (model, action) => (
  <div class="nav-right nav-menu">
    <span class="nav-item">
      <a class="button is-white">
        <span class="icon is-small">
          <i class="fa fa-upload"></i>
        </span>
        <span>Import</span>
      </a>
      <a
        class="button is-white"
        onclick={action.saveFile}
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
