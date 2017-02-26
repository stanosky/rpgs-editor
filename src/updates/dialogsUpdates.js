'use strict';
import {createTempNode, getNodeDataList} from '../utils';
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

  addAnswer: ({tempRpgs, tempNode}) => {
    tempRpgs.addNode('AnswerNode', {});
    let nodes = tempRpgs.getNodes();
    let index = nodes.length - 1;
    let answerNode = nodes[index];

    tempNode.addChild(answerNode.getId());
    return {tempRpgs, tempNode};
  },

  removeAnswer: ({tempRpgs, tempNode}, id) => {
    let children = tempNode.getChildren();
    let index = children.indexOf(id);

    tempNode.removeChild(index);
    return {tempRpgs, tempNode};
  },

  addTalk: ({rpgs, tempRpgs, tempNode, tempNodeData, currDialogNode}) => {
    let label = document.getElementById('nodeLabelInput').value;
    let id = tempNode.getId();
    let nodeToReplace = rpgs.findNode(id);

    tempNodeData.forEach(n => {
      console.log('remove nodes',n.class,n.uuid);
      rpgs.removeNode(n.uuid);
    });

    tempNode.setLabel(label);
    rpgs.mergeNodes(tempRpgs.getData());
    currDialogNode.addChild(id);
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

  setTalkNode: ({currTalkNode}, node) => {
    return {currTalkNode: node};
  },
};

export default update;
