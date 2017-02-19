'use strict';
import {getRandomLabel,createTempNode} from '../utils';
import addDialog from '../views/modals/addDialog';
import removeDialog from '../views/modals/removeDialog';
import editTalk from '../views/modals/editTalk';

const effects = {
  showEditDialogModal: (model, action) => {
    let tempNode = createTempNode(model.rpgs, 'DialogNode', {})
    let id = tempNode.getId();
    let input;

    action.setTempNodeId(id);
    action.setModal(addDialog);
    input = document.getElementById('nodeLabelInput');
    input.value = getRandomLabel('Dialog-', id);
    action.showModal();
  },

  showRemoveDialogModal: (model, action, id) => {
    action.setModal(removeDialog);
    let confirmBtn = document.getElementById('confirmBtn');
    //console.log('id',id);
    confirmBtn['data-id'] = id;
    action.showModal();
  },

  showEditTalkModal: (model, action) => {
    let tempNode = createTempNode(model.rpgs, 'TalkNode', {})
    let id = tempNode.getId();
    let input;

    action.setTempNodeId(id);
    action.setModal(editTalk)
    input = document.getElementById('nodeLabelInput');
    input.value = getRandomLabel('Talk-', id);
    action.showModal();
  },

  commitEditDialogModal: (model, action) => {
    action.addDialog();
    action.hideModal();

    let dialogs = model.rpgs.getNodes('DialogNode');
    let id = dialogs[dialogs.length-1].getId();

    action.selectDialog(id);
  },

  commitRemoveDialogModal: (model, action, id) => {
    action.removeDialog(id);
    action.hideModal();
    action.selectDialog('');
  },

  commitEditTalkModal: (model, action) => {

  }
};

export default effects;
