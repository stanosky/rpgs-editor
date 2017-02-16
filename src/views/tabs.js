'use strict';

import { h } from 'hyperapp';

const icon = ['fa-comments','fa-users', 'fa-tasks','fa-asterisk','fa-code'];

const view = (model, action) => (
  <div className="tabs is-centered is-boxed">
    <ul>
    {
      model.tabs.map((tab,index) =>
      <li
        className={(model.selectedTab === tab ? "is-active" : "")}
      >
        <a id={tab} onclick={action.switchTab}>
          <span className="icon is-small"><i class={'fa ' + icon[index]}></i></span>
          <span>{tab}</span>
        </a>
      </li>
      )
    }

    </ul>
  </div>
);

export default view;
