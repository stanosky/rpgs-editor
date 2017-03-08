'use strict';

import dialogsUpdates from './dialogsUpdates';
import {drawWire,getDivBounds} from '../common/gfx';

const updateNodePosition = (model, x, y) => {
  let stage = document.getElementById('dialogsStage');
  let scrollWidth = stage.scrollWidth;
  let scrollHeight = stage.scrollHeight;
  let nx = x - model.offsetX + stage.scrollLeft;
  let ny = y - model.offsetY + stage.scrollTop;
  model.dragNode.x = nx < 0 ? 0 : nx;
  model.dragNode.y = ny < 0 ? 0 : ny;
  model.stageScrollWidth = model.stageScrollWidth > scrollWidth
                          ? model.stageScrollWidth : scrollWidth;
  model.stageScrollHeight = model.stageScrollHeight > scrollHeight
                          ? model.stageScrollHeight : scrollHeight;
};

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

  dropNode: model => ({ dragNode: null }),

  dragNode: (model, { node, event }) => {
    event.preventDefault();
    let id = node.getId();
    let len = model.currDialogNode.getChildren().length;

    model.currDialogNode.setChildIndex(id,len-1);
    model.offsetX = model.stageOffsetLeft + event.offsetX;
    model.offsetY = model.stageOffsetTop + event.offsetY;
    model.dragNode = node;
    updateNodePosition(model,event.pageX,event.pageY);
    return model;
  },

  moveNode: (model, { x, y }) => {
    updateNodePosition(model,x,y);
    return model;
  },

  dropWire: model => {
    if(model.highlightId !== '') {
      //model.dragNode.addWire(model.tempWire.type, model.highlightId);
      model.rpgs.setConnection(model.tempWire.type,model.dragNode.getId(),model.highlightId);
    } /*else {
      model.dragNode.addWire(model.tempWire.type, model.tempWire.id);
    }*/
    model.highlightId = '';
    model.isWireDrawing = false;
    model.drawWire.graphics.clear();
    return { dragNode: null, tempWire: null };
  },

  dragWire: (model, { node, event, parentId, wireType }) => {
    event.preventDefault();
    //let wire = new createjs.Shape();
    //model.drawWire = wire;
    let tempId = node.getWires(wireType)[0] || null;
    model.tempWire = {type:wireType, id: tempId};
    if(tempId !== null) node.removeWire(wireType,tempId);

    model.isWireDrawing = true;
    model.dragNode = node;
    let parentNodeBounds = getDivBounds(parentId);
    let childNodeBounds = getDivBounds(node.getId());
    model.offsetX = model.stageOffsetLeft;
    model.offsetY = model.stageOffsetTop;
    model.wireX = parentNodeBounds.right - model.stageOffsetLeft + model.stageScrollLeft;
    model.wireY = childNodeBounds.top + (childNodeBounds.height * .5) - model.stageOffsetTop + model.stageScrollTop;
    //console.log(dragNode.getLabel());
    //model.canvas.addChild(wire);
    return model;
  },

  moveWire: (model, { x, y }) => {
    let stage = document.getElementById('dialogsStage');
    let nx = x - model.offsetX + stage.scrollLeft - 6;
    let ny = y - model.offsetY + stage.scrollTop;

    model.highlightId = '';
    model.currDialogNode.getChildren().forEach(child => {
      let id = child.getId();
      let b = getDivBounds(id);
      if(x >= b.left && x <= b.right && y >= b.top && y <= b.bottom) {
        model.highlightId = id;
      }
    });
    model.drawWire.graphics.clear();
    drawWire(model.drawWire.graphics, model.wireX, model.wireY, nx, ny);
    model.canvas.update();
    return model;
  },
},
dialogsUpdates);

export default update;
