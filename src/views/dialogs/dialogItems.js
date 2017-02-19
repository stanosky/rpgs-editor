'use strict';

import { h } from 'hyperapp';

const view = (model, action) => (
    model.rpgs.getNodes('DialogNode').map(d => {
      let id = d.getId();
      let label = d.getLabel();
      //console.log('dialogItems');
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
