'use strict';
import RPGS from '../libs/rpgs';


const getRandomLabel = (prefix, id) => prefix + id.substr(0,4);

const getNodeDataList = (rpgs, node) => {
  return node !== null ? node.getChildren().reduce((prevVal, currVal) => {
    //let currNode = RPGS.main.findNode(currVal);
    let children = currVal.getChildren();

    if(children.length > 0) {
      return prevVal.concat(getNodeDataList(rpgs, currVal));
    } else {
      return prevVal.concat(currVal.getData());
    }
  },[node.getData()]) : [];
};

const createTempNode = (model, actions, type, id = '') => {
  if(id === '') {
    model.tempNodeData = [];
    RPGS.temp.addNode(type, {});
  } else {
    let nodeToEdit = RPGS.main.findNode(id);
    //console.log('getNodeDataList:',getNodeDataList(RPGS.main, nodeToEdit));
    let data = getNodeDataList(RPGS.main, nodeToEdit);
    model.tempNodeData = data;
    RPGS.temp.mergeNodes(JSON.stringify(data));
  }
  model.tempNode = RPGS.temp.getNodes()[0];
};

const setupEditModal = (model, actions, view, labelPrefix) => {
  let input, label;
  label = model.tempNode.getLabel();
  actions.setModal(view);
  input = document.getElementById('nodeLabelInput');
  input.value = label || getRandomLabel(labelPrefix, model.tempNode.getId());
};

const mergeTempData = (tempNode, tempNodeData) => {
  let label = document.getElementById('nodeLabelInput').value;

  tempNodeData.forEach(n => RPGS.main.removeNode(n.uuid, false));
  tempNode.setLabel(label);
  RPGS.main.mergeNodes(RPGS.temp.serialize());
};

module.exports = {
  getRandomLabel,
  createTempNode,
  getNodeDataList,
  setupEditModal,
  mergeTempData
};
