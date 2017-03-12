'use strict';

import { h } from 'hyperapp';
import navTabs from './navTabs';
import navFile from './navFile';
import modal from './modals/modal'
import dialogs from './dialogs/dialogs';
import actors from './actors/actors';
import scripts from './scripts/scripts';
import variables from './variables/variables';
import quests from './quests/quests';

const view = (model, action) => {
  return(
  <div>
    <nav class="nav has-shadow">
      <div class="container">
        {navTabs(model, action)}
        {navFile(model, action)}
      </div>
    </nav>
    <section>
      {dialogs(model, action)}
      {actors(model, action)}
      {scripts(model, action)}
      {variables(model, action)}
      {quests(model, action)}
    </section>
    {modal(model, action)}
  </div>);
}

export default view;
