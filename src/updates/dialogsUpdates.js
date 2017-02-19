'use strict';
import {createTempNode} from '../utils';
import {Utils} from '../../../rpgs/rpgs/build/rpgs.min';

const update = {
  clearLabelCheck: ({labelAlreadyExist}) => ({labelAlreadyExist: false}),

  addDialog: ({rpgs,tempNodeId}) => {
    let label = document.getElementById('nodeLabelInput').value;
    let node = rpgs.findNode(tempNodeId);
    node.setLabel(label);
    //console.log(rpgs.serializeData());
    return {rpgs, tempNodeId: ''};
  },

  removeDialog: ({rpgs}, id) => {
    rpgs.removeNode(id);
    return {rpgs};
  },

  addAnswer: ({rpgs,tempNodeId}) => {
    let talkNode = rpgs.findNode(tempNodeId);
    let answerNode = createTempNode(rpgs, 'AnswerNode', {});

    talkNode.addChild(answerNode.getId());
    return {rpgs,tempNodeId}
  },

  removeAnswer: ({rpgs, tempNodeId}, id) => {
    let talkNode = rpgs.findNode(tempNodeId);
    let children = talkNode.getChildren();
    let index = children.indexOf(id);

    rpgs.removeNode(id);
    talkNode.removeChild(index);
    return {rpgs, tempNodeId};
  },

  onDialogLabelChange: ({rpgs,labelAlreadyExist}, value) => {
    let dialogs = rpgs.getNodes('DialogNode');
    labelAlreadyExist = dialogs.filter(d => d.getLabel() === value).length > 0;
    //console.log('labelAlreadyExist',labelAlreadyExist);
    return {rpgs,labelAlreadyExist};
  },

  onTalkLabelChange: ({rpgs,selectedDialog,labelAlreadyExist}, value) => {
    let dialogNode = rpgs.findNode(selectedDialog);
    let talksIds = dialogNode.getChildren();
    let talks = talksIds.map(id => rpgs.findNode(id));
    labelAlreadyExist = talks.filter(t => t.getLabel() === value).length > 0;
    console.log('labelAlreadyExist',labelAlreadyExist);
    return {rpgs,selectedDialog,labelAlreadyExist};
  },

  selectDialog: ({selectedDialog}, id) => ({selectedDialog: id}),
};

export default update;
