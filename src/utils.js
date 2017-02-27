'use strict';

const getRandomLabel = (prefix, id) => prefix + id.substr(0,4);

const getNodeDataList = (rpgs, node) => {
  return node !== null ? node.getChildren().reduce((prevVal, currVal) => {
    let currNode = rpgs.findNode(currVal);
    let children = currNode.getChildren();

    if(children.length > 0) {
      return prevVal.concat(getNodeDataList(rpgs, currNode));
    } else {
      return prevVal.concat(currNode.getData());
    }
  },[node.getData()]) : [];
};

const createTempNode = (model, action, type, id = '') => {
  if(id === '') {
    model.tempNodeData = [];
    model.tempRpgs.addNode(type, {});
  } else {
    let nodeToEdit = model.rpgs.findNode(id);
    //console.log('getNodeDataList:',getNodeDataList(model.rpgs, nodeToEdit));
    let data = JSON.parse(JSON.stringify(getNodeDataList(model.rpgs, nodeToEdit)));
    model.tempNodeData = data;
    model.tempRpgs.mergeNodes(data);
  }
  model.tempNode = model.tempRpgs.getNodes()[0];
};

const setupEditModal = (model, action, view, labelPrefix) => {
  let input, label;
  label = model.tempNode.getLabel();
  action.setModal(view);
  input = document.getElementById('nodeLabelInput');
  input.value = label || getRandomLabel(labelPrefix, model.tempNode.getId());
};

const mergeTempData = (rpgs, tempRpgs, tempNode, tempNodeData) => {
  let label = document.getElementById('nodeLabelInput').value;
  let id = tempNode.getId();
  let nodeToReplace = rpgs.findNode(id);

  tempNodeData.forEach(n => {
    //console.log('remove nodes',n.class,n.uuid);
    rpgs.removeNode(n.uuid);
  });

  tempNode.setLabel(label);
  rpgs.mergeNodes(tempRpgs.getData());
};

module.exports = {
  getRandomLabel,
  createTempNode,
  getNodeDataList,
  setupEditModal,
  mergeTempData
};
