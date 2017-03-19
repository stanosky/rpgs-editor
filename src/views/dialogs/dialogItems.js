'use strict';

import { h } from 'hyperapp';

const isActive = (model, id) => {
  return model.currDialogNode !== null && model.currDialogNode.getId() === id;
};

const isVisible = (model, label) => {
  return model.labelFiler === '' || label.indexOf(model.labelFiler) > -1;
};

const view = (model, actions) => (
    model.rpgs.getNodes('DialogNode').map(d => {
      let id = d.getId();
      let label = d.getLabel();
      //console.log('dialogItems');
      return (
        <li
          className={isVisible(model, label) ? '' : 'is-hidden'}
        >
          <a
            id={id}
            onclick={e => actions.selectDialogNode(model.rpgs.findNode(e.target.id))}
            className={isActive(model, id) ? 'is-active' : ''}
          >{label}</a>
        </li>
      );
    })
);

export default view;
//className={model.currDialogNode.getId() === id ? 'is-active' : ''}
