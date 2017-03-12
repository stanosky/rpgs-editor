'use strict';
import {Utils} from '../../../rpgs/rpgs/build/rpgs.min';
import {createTempNode,setupEditModal,mergeTempData} from '../common/utils';
import editDialog from '../views/modals/editDialog';
import editTalk from '../views/modals/editTalk';
import removeDialog from '../views/modals/removeDialog';
import removeTalk from '../views/modals/removeTalk';

const actions = {
  selectDialogNode: (model, node, action) => {
    action.setDialogNode(node);
    action.updateStage();
  },

  showEditDialogModal: (model, id, action) => {
    createTempNode(model, action, 'DialogNode', id);
    setupEditModal(model, action, editDialog, 'Dialog-');
    action.showModal();
  },

  commitEditDialogModal: (model, data, action) => {
    action.addDialog();
    action.hideModal();

    let dialogs = model.rpgs.getNodes('DialogNode');
    let dialogNode = dialogs[dialogs.length-1];

    action.selectDialogNode(dialogNode);
  },

  showRemoveDialogModal: (model, data, action) => {
    action.setModal(removeDialog);
    action.showModal();
  },

  commitRemoveDialogModal: (model, data, action) => {
    let id = model.currDialogNode.getId();
    action.selectDialogNode(null);
    model.rpgs.removeNode(id);
    action.hideModal();
  },

  showEditTalkModal: (model, id, action) => {
    createTempNode(model, action, 'TalkNode', id);
    setupEditModal(model, action, editTalk, 'Talk-');
    action.showModal();
  },

  commitEditTalkModal: (model, data, action) => {
    action.addTalk();
    action.hideModal();
    action.updateStage();
  },

  showRemoveTalkModal: (model, id, action) => {
    model.tempNode = model.rpgs.findNode(id);
    action.setModal(removeTalk);
    action.showModal();
  },

  commitRemoveTalkModal: (model, data, action) => {
    let id = model.tempNode.getId();
    let children = model.currDialogNode.getChildren();
    let index = Utils.getIndexById(children, id);
    model.currDialogNode.removeChild(index);
    action.hideModal();
    action.updateStage();
  },

  addDialog: ({rpgs, tempRpgs, tempNode, tempNodeData, currDialogNode}) => {
    mergeTempData(rpgs, tempRpgs, tempNode, tempNodeData);
    currDialogNode = rpgs.findNode(tempNode.getId());
    return {rpgs, tempRpgs, tempNode, tempNodeData, currDialogNode};
  },

  removeDialog: ({rpgs,currDialogNode}) => {
    if(currDialogNode !== null) {
      rpgs.removeNode(currDialogNode.getId());
    }
    return {rpgs, currDialogNode: null};
  },

  addAnswer: ({tempRpgs, tempNode}) => {
    tempNode.addChild({class:'AnswerNode'});
    return {tempRpgs, tempNode};
  },

  removeAnswer: ({tempRpgs, tempNode}, id) => {
    let children = tempNode.getChildren();
    let index = Utils.getIndexById(children, id);

    tempNode.removeChild(index);
    return {tempRpgs, tempNode};
  },

  addTalk: ({rpgs, tempRpgs, tempNode, tempNodeData, currDialogNode}) => {
    mergeTempData(rpgs, tempRpgs, tempNode, tempNodeData);
    currDialogNode.setNodeAsChild(tempNode);
    return {rpgs, tempRpgs, tempNode, tempNodeData, currDialogNode};
  },

  onDialogLabelChange: ({rpgs,labelAlreadyExist,tempNode}, value) => {
    let dialogs = rpgs.getNodes('DialogNode');

    labelAlreadyExist = dialogs.filter(d => d.getLabel() === value).length > 0;
    tempNode.setLabel(value);
    //console.log('labelAlreadyExist',labelAlreadyExist);
    return {rpgs,labelAlreadyExist,tempNode};
  },

  onTalkLabelChange: ({rpgs,tempNode,currDialogNode,labelAlreadyExist}, value) => {
    let talksIds = currDialogNode.getChildren();
    let talks = talksIds.map(id => rpgs.findNode(id));

    tempNode.setLabel(value);
    labelAlreadyExist = talks.filter(t => t.getLabel() === value).length > 0;
    //console.log('labelAlreadyExist',labelAlreadyExist);
    return {rpgs,tempNode,currDialogNode,labelAlreadyExist};
  },

  setDialogNode: ({currDialogNode}, node) => {
    return {currDialogNode: node};
  },

  setStartTalk: ({currDialogNode}, id) => {
    currDialogNode.setStartTalk(id);
    return {currDialogNode};
  }

};

export default actions;
