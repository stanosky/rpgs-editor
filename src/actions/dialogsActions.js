'use strict';
import {createTempNode,setupEditModal,mergeTempData} from '../common/utils';
import {getDivBounds} from '../common/gfx';
import editDialog from '../views/modals/editDialog';
import editTalk from '../views/modals/editTalk';
import removeDialog from '../views/modals/removeDialog';
import removeTalk from '../views/modals/removeTalk';
import dialogTester from '../views/modals/dialogTester';

const actions = {
  selectDialogNode: (model, node, actions) => {
    actions.setDialogNode(node);
    actions.updateStage();
  },

  showEditDialogModal: (model, id, actions) => {
    createTempNode(model, actions, 'DialogNode', id);
    setupEditModal(model, actions, editDialog, 'Dialog-');
    actions.showModal();
  },

  commitEditDialogModal: (model, data, actions) => {
    actions.addDialog();
    actions.hideModal();

    let dialogs = model.rpgs.getNodes('DialogNode');
    let dialogNode = dialogs[dialogs.length-1];

    actions.selectDialogNode(dialogNode);
  },

  showRemoveDialogModal: (model, data, actions) => {
    actions.setModal(removeDialog);
    actions.showModal();
  },

  commitRemoveDialogModal: (model, data, actions) => {
    let id = model.currDialogNode.getId();
    actions.selectDialogNode(null);
    model.rpgs.removeNode(id);
    actions.hideModal();
  },

  showEditTalkModal: (model, id, actions) => {
    createTempNode(model, actions, 'TalkNode', id);
    setupEditModal(model, actions, editTalk, 'Talk-');
    actions.showModal();
  },

  commitEditTalkModal: (model, data, actions) => {
    actions.addTalk();
    actions.hideModal();

    let children = model.currDialogNode.getChildren();
    let child = children[children.length - 1];
    let talkBounds = getDivBounds('TalkNode-'+child.getId());
    let stageBounds = getDivBounds(model.currStage.id);
    let x = model.stageX + (stageBounds.width - talkBounds.width) * .5;
    let y = model.stageY + (stageBounds.height - talkBounds.height) * .5;
    console.log(stageBounds);
    actions.setDragNode(child);
    actions.moveNode({x,y});
    actions.dropNode();
    actions.updateStage();
  },

  showRemoveTalkModal: (model, id, actions) => {
    model.tempNode = model.rpgs.findNode(id);
    actions.setModal(removeTalk);
    actions.showModal();
  },

  commitRemoveTalkModal: (model, data, actions) => {
    let id = model.tempNode.getId();
    let children = model.currDialogNode.getChildren();
    let index = rpgs.Utils.getIndexById(children, id);
    model.currDialogNode.removeChild(index);
    actions.hideModal();
    actions.updateStage();
  },

  showDialogTesterModal: (model, data, actions) => {
    model.dialogWalker.setDialog(model.currDialogNode.getId());
    actions.setModal(dialogTester);
    actions.showModal();
  },

  dialogTesterSelectOption: (model, id, actions) => {
    let isConversationContinued = model.dialogWalker.selectOption(id);
    //console.log('isConversationContinued',isConversationContinued);
    //if(!isConversationContinued) actions.hideModal();
    return isConversationContinued ? {model} : new Promise(actions.hideModal);
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
    let index = rpgs.Utils.getIndexById(children, id);

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

  filterDialogs: ({labelFiler}, value) => {
    //console.log('filterDialogs:',value);
    return {labelFiler:value};
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
