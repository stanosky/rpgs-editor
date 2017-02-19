'use strict';

import { h } from 'hyperapp';

const view = (model, action) => (
  <div class="card talk-node">
    <header class="card-header">
      <p class="card-header-title">
        Node
      </p>
      <a class="card-header-icon">
        <span class="icon">
          <i class="fa fa-trash"></i>
        </span>
      </a>
      <a class="card-header-icon">
        <span class="icon">
          <i class="fa fa-pencil"></i>
        </span>
      </a>
    </header>
    <div class="card-content">
      <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
      </div>

      <footer class="card-footer">Answer 1</footer>
      <footer class="card-footer">Answer 2</footer>
      <footer class="card-footer">Answer 3</footer>
      <footer class="card-footer">Answer 4</footer>
    </div>
  </div>
);

export default view;
