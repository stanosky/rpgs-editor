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

  setStageSize: ({width,height}) => {
    console.log('setStageSize',width,height);
    return {stageWidth:width,stageHeight:height};
  },

  drop: model => ({ dragNode: null }),

  drag: (model, { dragNode, event }) => {
    let id = dragNode.getId();
    let len = model.currDialogNode.getChildren().length;
    let stage = document.getElementById('dialogsStage');

    model.currDialogNode.setChildIndex(id,len-1);

    model.offsetX = 300 + event.offsetX;
    model.offsetY = 49 + event.offsetY;
    dragNode.x = event.pageX - model.offsetX + stage.scrollLeft;
    dragNode.y = event.pageY - model.offsetY + stage.scrollTop;
    //console.log(dragNode.x,dragNode.y,model.offsetX,model.offsetY);
    return {dragNode};
  },

  move: (model, { x, y }) => {
    let stage = document.getElementById('dialogsStage');
    let scrollWidth = stage.scrollWidth;
    let scrollHeight = stage.scrollHeight;

    if(model.dragNode !== null) {
      model.dragNode.x = x - model.offsetX + stage.scrollLeft;
      model.dragNode.y = y - model.offsetY + stage.scrollTop;
      model.stageWidth = model.stageWidth > scrollWidth ? model.stageWidth : scrollWidth;
      model.stageHeight = model.stageHeight > scrollHeight ? model.stageHeight : scrollHeight;
    }
    return model;
  }
},
dialogsUpdates);

export default update;
