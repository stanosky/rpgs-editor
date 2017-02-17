'use strict';

import { h } from 'hyperapp';

const view = (model, action) => (
    model.rpgs.getDialogs().map(d => {
      let id = d.getId();
      let label = d.getLabel();
      return (
        <div className="panel-block">
          <p>{label}</p>
          <a
            id={id}
            class="delete"
            onclick={e => action.showRemoveDialogModal(e.target.id)}
          ></a>
        </div>
      );
    })
);

export default view;
