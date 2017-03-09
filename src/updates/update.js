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

  setStage: ({currStage, /*stageWidth, stageHeight, currZoom*/},stage) => {
    //let rect = stage.getBoundingClientRect();

    return {currStage:stage/*, stageWidth: rect.width/currZoom, stageHeight: rect.height/currZoom*/};
  },

  setCanvas: ({canvas, tempDrawArea, wiresDrawArea}, {c, tda, wda}) => {
    return {canvas: c, tempDrawArea: tda, wiresDrawArea: wda};
  },

  setDragNode: ({dragNode}, node) => {
    return { dragNode: node };
  },

  setDragOffset: ({offsetX,offsetY},{x,y}) => {
    return {offsetX:x,offsetY:y};
  },

  setNodePosition: (model, {x, y}) => {
    let nx = (x + model.currStage.scrollLeft - model.stageX) / model.currZoom - model.offsetX;
    let ny = (y + model.currStage.scrollTop - model.stageY) / model.currZoom - model.offsetY;
    model.dragNode.x = nx < 0 ? 0 : nx;
    model.dragNode.y = ny < 0 ? 0 : ny;
    return model;
  },

  dropWire: model => {
    if(model.highlightId !== '') {
      model.rpgs.setConnection(model.tempWire.type,model.dragNode.getId(),model.highlightId);
    }
    model.highlightId = '';
    model.isWireDrawing = false;
    model.tempDrawArea.graphics.clear();
    return { dragNode: null, tempWire: null };
  },

  setTempWire: ({tempWire,isWireDrawing},params) => {
    return {tempWire:params,isWireDrawing:true};
  },

  setWirePosition: ({wireX,wireY},{x,y}) => {
    return {wireX:x,wireY:y};
  },

  setHighlight: ({highlightId},id) => {
    return {highlightId: id};
  },

  zoomIn: ({currZoom,maxZoom}) => {
    currZoom += currZoom + .1 <= maxZoom ? .1 : 0;
    return {currZoom}
  },

  zoomOut: ({currZoom,minZoom}) => {
    currZoom -= currZoom - .1 >= minZoom ? .1 : 0;
    return {currZoom}
  },
},
dialogsUpdates);

export default update;
