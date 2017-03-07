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
    return {stageScrollWidth:width,stageScrollHeight:height};
  },

  drop: model => ({ dragNode: null }),

  drag: (model, { dragNode, event }) => {
    let id = dragNode.getId();
    let len = model.currDialogNode.getChildren().length;
    let stage = document.getElementById('dialogsStage');

    model.currDialogNode.setChildIndex(id,len-1);

    model.offsetX = 300 + event.offsetX;
    model.offsetY = 49 + event.offsetY;
    let nx = event.pageX - model.offsetX + stage.scrollLeft;
    let ny = event.pageY - model.offsetY + stage.scrollTop;
    dragNode.x = nx < 0 ? 0 : nx;
    dragNode.y = ny < 0 ? 0 : ny;
    //console.log(dragNode.x,dragNode.y,model.offsetX,model.offsetY);
    return {dragNode};
  },

  move: (model, { x, y }) => {
    let stage = document.getElementById('dialogsStage');
    let scrollWidth = stage.scrollWidth;
    let scrollHeight = stage.scrollHeight;
    let nx = x - model.offsetX + stage.scrollLeft;
    let ny = y - model.offsetY + stage.scrollTop;
    model.dragNode.x = nx < 0 ? 0 : nx;
    model.dragNode.y = ny < 0 ? 0 : ny;
    model.stageScrollWidth = model.stageScrollWidth > scrollWidth ? model.stageScrollWidth : scrollWidth;
    model.stageScrollHeight = model.stageScrollHeight > scrollHeight ? model.stageScrollHeight : scrollHeight;

    return model;
  }
},
dialogsUpdates);

export default update;
