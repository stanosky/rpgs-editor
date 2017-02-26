'use strict';
import {getRandomLabel,createTempNode,getNodeDataList} from '../utils';
import addDialog from '../views/modals/addDialog';
import removeDialog from '../views/modals/removeDialog';
import removeTalk from '../views/modals/removeTalk';
import editTalk from '../views/modals/editTalk';


const effects = {
  showEditDialogModal: (model, action, node) => {
    let tempNode = node || createTempNode(model.rpgs, 'DialogNode', {});
    let label = tempNode.getLabel();
    let input;

    action.setTempNode(tempNode);
    action.setModal(addDialog);
    input = document.getElementById('nodeLabelInput');
    input.value = label || getRandomLabel('Dialog-', tempNode.getId());
    action.showModal();
  },

  showRemoveDialogModal: (model, action) => {
    //console.log('getNodeDataList:',getNodeDataList(model.rpgs, model.currDialogNode));
    action.setModal(removeDialog);
    action.showModal();
  },

  showEditTalkModal: (model, action, id) => {
    let tempNode, input, label;
    if(id === '') {
      model.tempRpgs.addNode('TalkNode', {});
      model.tempNodeData = [];
    } else {
      let node = model.rpgs.findNode(id);
      model.tempNodeData = getNodeDataList(model.rpgs, node);
      model.tempRpgs.mergeNodes(model.tempNodeData);
    }
    model.tempNode = model.tempRpgs.getNodes()[0];
    label = model.tempNode.getLabel();
    action.setModal(editTalk);
    input = document.getElementById('nodeLabelInput');
    input.value = label || getRandomLabel('Talk-', model.tempNode.getId());
    action.showModal();
  },

  showRemoveTalkModal: (model, action) => {
    action.setModal(removeTalk);
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
    let id = model.currDialogNode.getId();
    action.setDialogNode(null);
    model.rpgs.removeNode(id);
    action.hideModal();
  },

  commitRemoveTalkModal: (model, action) => {
    let id = model.currTalkNode.getId();
    let children = model.currDialogNode.getChildren();
    let index = children.indexOf(id);
    model.currDialogNode.removeChild(index);
    //action.setTalkNode(null);
    action.hideModal();
  },

  commitEditTalkModal: (model, action) => {
    action.addTalk();
    action.hideModal();
  }
};

export default effects;
