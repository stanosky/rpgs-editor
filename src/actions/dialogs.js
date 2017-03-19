'use strict';
import {setupEditModal} from '../common/utils';
import {getDivBounds} from '../common/gfx';
import RPGSW from '../libs/rpgsWrapper';

const actions = {
  selectDialogNode: (model, node, actions) => {
    actions.setDialogNode(node);
    actions.updateStage();
  },

  showEditDialogModal: (model, id, actions) => {
    RPGSW.createTempNode('DialogNode', id);
    setupEditModal(actions, 'editDialog', 'Dialog-');
    actions.showModal();
  },

  commitEditDialogModal: (model, data, actions) => {
    actions.addDialog();
    actions.hideModal();

    let dialogs = RPGSW.main.getNodes('DialogNode');
    let dialogNode = dialogs[dialogs.length-1];

    actions.selectDialogNode(dialogNode);
  },

  showRemoveDialogModal: (model, data, actions) => {
    actions.setModal('removeDialog');
    actions.showModal();
  },

  commitRemoveDialogModal: (model, data, actions) => {
    let id = model.currDialogNode.getId();
    actions.selectDialogNode(null);
    RPGSW.main.removeNode(id);
    actions.hideModal();
  },

  showEditTalkModal: (model, id, actions) => {
    RPGSW.createTempNode('TalkNode', id);
    setupEditModal(actions, 'editTalk', 'Talk-');
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
    RPGSW.setTempNode(id);
    actions.setModal('removeTalk');
    actions.showModal();
  },

  commitRemoveTalkModal: (model, data, actions) => {
    let id = RPGSW.tempNode.getId();
    let children = model.currDialogNode.getChildren();
    let index = RPGSW.utils.getIndexById(children, id);
    model.currDialogNode.removeChild(index);
    actions.hideModal();
    actions.updateStage();
  },

  showDialogTesterModal: (model, data, actions) => {
    RPGSW.walker.setDialog(model.currDialogNode.getId());
    actions.setModal('dialogTester');
    actions.showModal();
  },

  dialogTesterSelectOption: (model, id, actions) => {
    let isConversationContinued = RPGSW.walker.selectOption(id);
    //console.log('isConversationContinued',isConversationContinued);
    //if(!isConversationContinued) actions.hideModal();
    return isConversationContinued ? {model} : new Promise(actions.hideModal);
  },

  addDialog: ({currDialogNode}) => {
    RPGSW.mergeTempData();
    currDialogNode = RPGSW.main.findNode(RPGSW.tempNode.getId());
    return {currDialogNode};
  },

  removeDialog: ({currDialogNode}) => {
    if(currDialogNode !== null) {
      RPGSW.main.removeNode(currDialogNode.getId());
    }
    return {currDialogNode: null};
  },

  addAnswer: (model, data, actions) => {
    RPGSW.tempNode.addChild({class:'AnswerNode'});
    actions.update();
  },

  removeAnswer: (model, id, actions) => {
    let children = RPGSW.tempNode.getChildren();
    let index = RPGSW.utils.getIndexById(children, id);

    RPGSW.tempNode.removeChild(index);
    actions.update();
  },

  addTalk: ({currDialogNode}) => {
    RPGSW.mergeTempData();
    currDialogNode.setNodeAsChild(RPGSW.tempNode);
    return {currDialogNode};
  },

  onDialogLabelChange: ({labelAlreadyExist}, value) => {
    let dialogs = RPGSW.main.getNodes('DialogNode');

    labelAlreadyExist = dialogs.filter(d => d.getLabel() === value).length > 0;
    RPGSW.tempNode.setLabel(value);
    //console.log('labelAlreadyExist',labelAlreadyExist);
    return {labelAlreadyExist};
  },

  onTalkLabelChange: ({currDialogNode,labelAlreadyExist}, value) => {
    let talksIds = currDialogNode.getChildren();
    let talks = talksIds.map(id => RPGSW.main.findNode(id));

    RPGSW.tempNode.setLabel(value);
    labelAlreadyExist = talks.filter(t => t.getLabel() === value).length > 0;
    //console.log('labelAlreadyExist',labelAlreadyExist);
    return {currDialogNode,labelAlreadyExist};
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
