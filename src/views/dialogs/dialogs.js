'use strict';

import { h } from 'hyperapp';
import dialogsMenu from './dialogsMenu';
import stage from '../stage/stage';

const view = (model, action) => (
  <div id="DialogsTab" className={
    model.selectedTab === 'Dialogs' ? '' : 'is-hidden'
  }>
    {dialogsMenu(model, action)}
    {stage(model, action)}    
  </div>
);

export default view;
