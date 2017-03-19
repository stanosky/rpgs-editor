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

const view = (model, actions) => {
  return(
  <div className={model.stageDragging ? 'move' : ''}>
    <nav className="nav has-shadow">
      <div className="container">
        {navTabs(model, actions)}
        {navFile(model, actions)}
      </div>
    </nav>
    <section>
      {dialogs(model, actions)}
      {actors(model, actions)}
      {scripts(model, actions)}
      {variables(model, actions)}
      {quests(model, actions)}
    </section>
    {modal(model, actions)}
  </div>);
}

export default view;
