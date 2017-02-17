'use strict';

import { h } from 'hyperapp';
import dialogsMenu from './dialogsMenu';
import stage from '../stage/stage';

const view = (model, action) => (
  <div id="DialogsTab" className={
    model.selectedTab === 'Dialogs' ? '' : 'is-hidden'
  }>
    {stage(model, action)}
    {dialogsMenu(model, action)}
  </div>
);

export default view;
