'use strict';

import {Utils} from '../../../rpgs/rpgs/build/rpgs.min';

const update = {
  clearAddDialogModal: ({modalType,labelAlreadyExist}) => {
    return {modalType: 'addDialog', labelAlreadyExist:false};
  },

  addDialog: ({rpgs}) => {
    let label = document.getElementById('dialogLabelInput').value;
    rpgs.addNode('DialogNode', {label}, false);
    //console.log(rpgs.serializeData());
    return {rpgs};
  },

  deleteDialog: ({rpgs}, e) => {
    rpgs.removeNode(e.currentTarget.id);
    return {rpgs};
  },

  onLabelChange: ({rpgs,labelAlreadyExist}, e) => {
    let value = e.currentTarget.value;
    let dialogs = rpgs.getDialogs();
    labelAlreadyExist = dialogs.filter(d => d.getLabel() === value).length > 0;
    //console.log('labelAlreadyExist',labelAlreadyExist);
    return {rpgs,labelAlreadyExist};
  }
};

export default update;
