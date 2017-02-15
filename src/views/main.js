'use strict';

import { h } from 'hyperapp';
import tabs from './tabs';
import dialogs from './dialogs/dialogs';

const view = (model, msg) => (
  <div>
    <div>
      {tabs(model, msg)}
    </div>
    <section>
      {dialogs(model,msg)}
    </section>
  </div>
);

export default view;
