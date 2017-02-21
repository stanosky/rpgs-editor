'use strict';

import { h } from 'hyperapp';

const isActive = (model, id) => {
  return model.currDialogNode !== null && model.currDialogNode.getId() === id;
};

const view = (model, action) => (
    model.rpgs.getNodes('DialogNode').map(d => {
      let id = d.getId();
      let label = d.getLabel();
      //console.log('dialogItems');
      return (
        <li>
          <a
            id={id}
            onclick={e => action.setDialogNode(model.rpgs.findNode(e.target.id))}
            className={isActive(model, id) ? 'is-active' : ''}
          >{label}</a>
        </li>
      );
    })
);

export default view;
//className={model.currDialogNode.getId() === id ? 'is-active' : ''}
