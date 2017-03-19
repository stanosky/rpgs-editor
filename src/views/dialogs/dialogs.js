'use strict';

import { h } from 'hyperapp';
import dialogsMenu from './dialogsMenu';
import stage from '../stage/stage';

const view = (model, actions) => (
  <div
    id="DialogsTab"
    className={model.selectedTab === 'Dialogs' ? '' : 'is-hidden'}
  >
    {dialogsMenu(model, actions)}
    {stage(model, actions)}
  </div>
);

export default view;
