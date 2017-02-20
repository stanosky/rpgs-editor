'use strict';
import {getRandomLabel,createTempNode} from '../utils';
import addDialog from '../views/modals/addDialog';
import removeDialog from '../views/modals/removeDialog';
import editTalk from '../views/modals/editTalk';

const effects = {
  showEditDialogModal: (model, action) => {
    let tempNode = createTempNode(model.rpgs, 'DialogNode', {})
    let input;

    action.setTempNode(tempNode);
    action.setModal(addDialog);
    input = document.getElementById('nodeLabelInput');
    input.value = getRandomLabel('Dialog-', tempNode.getId());
    action.showModal();
  },

  showRemoveDialogModal: (model, action) => {
    action.setModal(removeDialog);
    action.showModal();
  },

  showEditTalkModal: (model, action) => {
    let tempNode = createTempNode(model.rpgs, 'TalkNode', {})
    let input;

    action.setTempNode(tempNode);
    action.setModal(editTalk)
    input = document.getElementById('nodeLabelInput');
    input.value = getRandomLabel('Talk-', tempNode.getId());
    action.showModal();
  },

  commitEditDialogModal: (model, action) => {
    action.addDialog();
    action.hideModal();

    let dialogs = model.rpgs.getNodes('DialogNode');
    let dialogNode = dialogs[dialogs.length-1];//.getId();

    action.setDialogNode(dialogNode);
  },

  commitRemoveDialogModal: (model, action) => {
    action.removeDialog();
    action.hideModal();
    action.setDialogNode(null);
  },

  commitEditTalkModal: (model, action) => {
    action.addTalk();
    action.hideModal();
  }
};

export default effects;
