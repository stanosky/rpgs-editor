'use strict';

import { h } from 'hyperapp';

const view = (model, action) => (
    model.rpgs.getDialogs().map(d => {
      let id = d.getId();
      let label = d.getLabel();
      return (
        <li>
          <a
            id={id}
            onClick={e => action.selectDialog(e.target.id)}
            className={model.selectedDialog === id ? 'is-active' : ''}
          >{label}</a>
        </li>
      );
    })
);

export default view;
/*<a
  id={id}
  class="delete"
  onclick={e => action.showRemoveDialogModal(e.target.id)}
>
</a>*/
