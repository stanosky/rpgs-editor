'use strict';
import {createTempNode,setupEditModal} from '../common/utils';
import {Utils} from '../../../rpgs/rpgs/build/rpgs.min';
import editDialog from '../views/modals/editDialog';
import editTalk from '../views/modals/editTalk';
import removeDialog from '../views/modals/removeDialog';
import removeTalk from '../views/modals/removeTalk';

const effects = {
  selectDialogNode: (model, action, node) => {
    action.setDialogNode(node);
    action.updateStage();
  },

  showEditDialogModal: (model, action, id = '') => {
    createTempNode(model, action, 'DialogNode', id);
    setupEditModal(model, action, editDialog, 'Dialog-');
    action.showModal();
  },

  commitEditDialogModal: (model, action) => {
    action.addDialog();
    action.hideModal();

    let dialogs = model.rpgs.getNodes('DialogNode');
    let dialogNode = dialogs[dialogs.length-1];

    action.selectDialogNode(dialogNode);
  },

  showRemoveDialogModal: (model, action) => {
    action.setModal(removeDialog);
    action.showModal();
  },

  commitRemoveDialogModal: (model, action) => {
    let id = model.currDialogNode.getId();
    action.selectDialogNode(null);
    model.rpgs.removeNode(id);
    action.hideModal();
  },

  showEditTalkModal: (model, action, id = '') => {
    createTempNode(model, action, 'TalkNode', id);
    setupEditModal(model, action, editTalk, 'Talk-');
    action.showModal();
  },

  commitEditTalkModal: (model, action) => {
    action.addTalk();
    action.hideModal();
    action.updateStage();
  },

  showRemoveTalkModal: (model, action, id) => {
    model.tempNode = model.rpgs.findNode(id);
    action.setModal(removeTalk);
    action.showModal();
  },

  commitRemoveTalkModal: (model, action) => {
    let id = model.tempNode.getId();
    let children = model.currDialogNode.getChildren();
    let index = Utils.getIndexById(children, id);
    model.currDialogNode.removeChild(index);
    action.hideModal();
    action.updateStage();
  }

};

export default effects;
