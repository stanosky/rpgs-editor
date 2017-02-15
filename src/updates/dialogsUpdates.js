'use strict';

import {Utils} from '../../../rpgs/rpgs/build/rpgs.min';

const update = {
  showAddDialogModal: ({isAddDialogVisible,labelAlreadyExist}) => {
    let input = document.getElementById('dialogLabelInput');
    input.value = 'Dialog-' + (Utils.getUUID().substr(0, 4));
    return {isAddDialogVisible: true, labelAlreadyExist:false};
  },

  hideAddDialogModal: ({isAddDialogVisible}) => ({ isAddDialogVisible: false}),

  addDialog: ({rpgs,isAddDialogVisible}) => {
    let label = document.getElementById('dialogLabelInput').value;
    rpgs.addNode('DialogNode',{label},false);
    //console.log(rpgs.serializeData());
    return {rpgs,isAddDialogVisible:false};
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
