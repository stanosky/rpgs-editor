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
    let id = dragNode.getId();
    let len = model.currDialogNode.getChildren().length;
    model.currDialogNode.setChildIndex(id,len-1);

    model.offsetX = 300 + event.offsetX;
    model.offsetY = 49 + event.offsetY;
    dragNode.x = event.pageX - model.offsetX;
    dragNode.y = event.pageY - model.offsetY;

    //console.log(dragNode.x,dragNode.y,model.offsetX,model.offsetY);
    return {dragNode};
  },

  move: (model, { x, y }) => {
    if(model.dragNode !== null) {
      model.dragNode.x = x - model.offsetX;
      model.dragNode.y = y - model.offsetY;
    }
    return model;
  }
},
dialogsUpdates);

export default update;
