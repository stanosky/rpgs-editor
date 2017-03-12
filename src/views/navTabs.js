'use strict';

import { h } from 'hyperapp';

const icon = ['fa-comments','fa-users', 'fa-tasks','fa-asterisk','fa-code'];

const view = (model, action) => (
  <div class="nav-left">
    {
      model.tabs.map((tab,index) =>
        <a
          id={tab} onclick={e => action.switchTab(e)}
          className={"nav-item is-tab " + (model.selectedTab === tab ? "is-active" : "")}
        >
          <span className="icon is-small"><i class={'fa ' + icon[index]}></i></span>
          <span>{tab}</span>
        </a>
      )
    }
  </div>
);

export default view;
