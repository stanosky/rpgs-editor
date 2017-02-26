'use strict';
import {createTempNode} from '../utils';
import {Utils} from '../../../rpgs/rpgs/build/rpgs.min';


const update = {
  clearLabelCheck: ({labelAlreadyExist}) => ({labelAlreadyExist: false}),

  addDialog: ({rpgs,tempNode}) => {
    let label = document.getElementById('nodeLabelInput').value;
    tempNode.setLabel(label);
    //console.log(rpgs.serializeData());
    return {rpgs, tempNode: null};
  },

  removeDialog: ({rpgs,currDialogNode}) => {
    if(currDialogNode !== null) {
      rpgs.removeNode(currDialogNode.getId());
    }
    return {rpgs, currDialogNode: null};
  },

  addAnswer: ({rpgs,tempNode}) => {
    let answerNode = createTempNode(rpgs, 'AnswerNode', {});

    tempNode.addChild(answerNode.getId());
    return {rpgs,tempNode};
  },

  removeAnswer: ({rpgs, tempNode}, id) => {
    let children = tempNode.getChildren();
    let index = children.indexOf(id);

    tempNode.removeChild(index);
    return {rpgs, tempNode};
  },

  addTalk: ({rpgs, tempNode, currDialogNode, currTalkNode}) => {
    let label = document.getElementById('nodeLabelInput').value;
    tempNode.setLabel(label);
    if(currTalkNode !== tempNode) {
      currTalkNode = tempNode;
      currDialogNode.addChild(currTalkNode.getId());
    }
    return {rpgs, tempNode, currDialogNode, currTalkNode};
  },

  onDialogLabelChange: ({rpgs,labelAlreadyExist,tempNode}, value) => {
    let dialogs = rpgs.getNodes('DialogNode');

    labelAlreadyExist = dialogs.filter(d => d.getLabel() === value).length > 0;
    tempNode.setLabel(value);
    //console.log('labelAlreadyExist',labelAlreadyExist);
    return {rpgs,labelAlreadyExist,tempNode};
  },

  onTalkLabelChange: ({rpgs,currDialogNode,labelAlreadyExist,tempNode}, value) => {
    let talksIds = currDialogNode.getChildren();
    let talks = talksIds.map(id => rpgs.findNode(id));

    labelAlreadyExist = talks.filter(t => t.getLabel() === value).length > 0;
    tempNode.setLabel(value);
    //console.log('labelAlreadyExist',labelAlreadyExist);
    return {rpgs,currDialogNode,labelAlreadyExist,tempNode};
  },

  setDialogNode: ({currDialogNode}, node) => {
    return {currDialogNode: node};
  },

  setTalkNode: ({currTalkNode}, node) => {
    return {currTalkNode: node};
  },
};

export default update;
