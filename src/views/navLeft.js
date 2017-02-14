'use strict';

import { h } from 'hyperapp';

const view = (model, msg) => (
  <div className="nav-left">
    {
      model.tabs.map((tab) =>
      <a
        id={tab}
        className={
          "nav-item is-tab is-hidden-mobile "
          + (model.selectedTab === tab ? "is-active" : "")
        }
        onclick={msg.switchTab}
      >{tab}</a>)
    }
  </div>
);

export default view;
