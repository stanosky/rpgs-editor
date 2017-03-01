'use strict';

import { h } from 'hyperapp';
import tabs from './tabs';
import file from './file';
import modal from './modals/modal'
import dialogs from './dialogs/dialogs';

const view = (model, action) => (
  <div>
    <nav class="nav has-shadow">
      <div class="container">
        {tabs(model, action)}
        {file(model, action)}
      </div>
    </nav>
    <section>
      {dialogs(model, action)}
    </section>
    {modal(model, action)}
  </div>
);

export default view;
/*


 */
