'use strict';

import { h } from 'hyperapp';
import navLeft from './tabs';
import dialogs from './dialogs/dialogs';

const view = (model, msg) => (
  <div>
    <div>
      {navLeft(model, msg)}
    </div>
    <section>
      {dialogs(model,msg)}
    </section>
  </div>
);

export default view;
