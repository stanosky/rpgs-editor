'use strict';
import RPGSW from '../libs/rpgsWrapper';


const getRandomLabel = (prefix, id) => prefix + id.substr(0,4);

const getNodeDataList = (node) => {
  return node !== null ? node.getChildren().reduce((prevVal, currVal) => {
    let children = currVal.getChildren();

    if(children.length > 0) {
      return prevVal.concat(getNodeDataList(currVal));
    } else {
      return prevVal.concat(currVal.getData());
    }
  },[node.getData()]) : [];
};

const createTempNode = (model, actions, type, id = '') => {
  if(id === '') {
    model.tempNodeData = [];
    RPGSW.temp.addNode(type, {});
  } else {
    let nodeToEdit = RPGSW.main.findNode(id);
    //console.log('getNodeDataList:',getNodeDataList(nodeToEdit));
    let data = getNodeDataList(nodeToEdit);
    model.tempNodeData = data;
    RPGSW.temp.mergeNodes(JSON.stringify(data));
  }
  model.tempNode = RPGSW.temp.getNodes()[0];
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

  tempNodeData.forEach(n => RPGSW.main.removeNode(n.uuid, false));
  tempNode.setLabel(label);
  RPGSW.main.mergeNodes(RPGSW.temp.serialize());
};

module.exports = {
  getRandomLabel,
  createTempNode,
  getNodeDataList,
  setupEditModal,
  mergeTempData
};
