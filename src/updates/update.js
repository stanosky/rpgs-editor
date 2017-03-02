'use strict';

import dialogsUpdates from './dialogsUpdates';

const update = Object.assign({
  switchTab: ({ selectedTab }, e) => {
    let clickedTab = e.currentTarget.id;
    let oldTab = document.getElementById(selectedTab);
    let newTab = document.getElementById(clickedTab);

    if(clickedTab !== selectedTab) {
      oldTab.classList.remove('is-active');
      newTab.classList.add('is-active');
    }
    return {selectedTab: clickedTab};
  },

  clearLabelCheck: ({labelAlreadyExist}) => ({labelAlreadyExist: false}),

  setModal: ({ modalView }, view) => ({modalView: view}),

  showModal: ({ modalVisible }) => ({ modalVisible: true}),

  hideModal: ({tempRpgs, tempNode, tempNodeData, modalVisible, modalView }) => {
    tempRpgs.clearData();
    return {tempRpgs, tempNode: null, tempNodeData: null, modalVisible: false, modalView: null};
  },

  setLoadingFile: ({loadingFile}, value) => ({loadingFile: value}),

  setTempNode: ({tempNode}, node) => {
    //console.log('setTempNode',node);
    return {tempNode: node}
  },

  setTempNodeData: ({tempNodeData}, data) => {
    //console.log('setTempNodeData',data);
    return {tempNodeData: data}
  },

  drop: model => ({ dragNode: null }),

  drag: (model, { dragNode, event }) => {
    model.offsetX = event.offsetX;
    model.offsetY = event.offsetY;
    dragNode.x = event.pageX;
    dragNode.y = event.pageY;
    //console.log(dragNode.x,dragNode.y,model.offsetX,model.offsetY)
    //dragNode.offsetX = event.offsetX;
    //dragNode.offsetY = event.offsetY;
    return {dragNode};
  },

  move: (model, { x, y }) => {
    if(model.dragNode !== null) {
      model.dragNode.x = x - 300 - model.offsetX;
      model.dragNode.y = y - 49 - model.offsetY;
    }
    return model;
  }
},
dialogsUpdates);

export default update;
