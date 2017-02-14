'use strict';

import { h } from 'hyperapp';

const view = (model, msg) => (
    model.rpgs.getDialogs().map(d => {
      let id = d.getId();
      return (
        <div className="panel-block">
          <p>{id}</p>
          <a
            id={id}
            class="delete"
            onclick={msg.deleteDialog}
          ></a>
        </div>
      );
    })
);

export default view;