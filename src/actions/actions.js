'use strict';

import {Utils} from '../../../rpgs/rpgs/build/rpgs.min';
import FileSaver from 'file-saver';
import dialogsActions from './dialogsActions';
import loadFile from '../views/modals/loadFile';
import {drawWire,getDivBounds} from '../common/gfx';

const actions = Object.assign({
  switchTab: (model, e, action) => {
    let clickedTab = e.currentTarget.id;
    let oldTab = document.getElementById(model.selectedTab);
    let newTab = document.getElementById(clickedTab);
    //console.log('switchTab',clickedTab);
    if(clickedTab !== model.selectedTab) {
      oldTab.classList.remove('is-active');
      newTab.classList.add('is-active');
      action.setTab(clickedTab);
      //console.log('action.router',action.router);
      //action.router.go("/"+clickedTab);
      action.updateStage();
    }
  },

  initStage: (model, data, action) => {
    console.log('initStage');
    let stage = document.getElementById('dialogsStage');

    action.setStage(stage);
  },


  updateStage: (model, data, action) => {
    //console.log('updateStage');
    action.updateWires();
  },

  initCanvas: (model, data, action) => {
    //console.log('initCanvas')
    let canvas = new createjs.Stage("stage-canvas");
    let tempDrawArea = new createjs.Shape();
    let wiresDrawArea = new createjs.Shape();

    canvas.addChild(wiresDrawArea);
    canvas.addChild(tempDrawArea);
    action.setCanvas({c:canvas,tda:tempDrawArea,wda:wiresDrawArea});
    action.updateWires();
  },

  updateWires: (model, data, action) => {
    if (model.canvas === null) return;

    model.wiresDrawArea.graphics.clear();
    if (model.currDialogNode) {
      model.currDialogNode.getChildren().forEach(childNode => {
        childNode.getChildren().forEach(subChildNode => {
          let sourceBounds, targetBounds, sx, sy, ex, ey,
              ox = model.stageX - model.currStage.scrollLeft,
              oy = model.stageY - model.currStage.scrollTop,
              gotoId = subChildNode.getWires('goto')[0];

          if (gotoId !== undefined) {
            targetBounds = getDivBounds(gotoId);
            sourceBounds = getDivBounds(subChildNode.getId());
            if (targetBounds && sourceBounds) {
              sx = (sourceBounds.right - ox) / model.currZoom;
              sy = (sourceBounds.top - oy + (sourceBounds.height * .5)) / model.currZoom;
              ex = (targetBounds.left - ox - 6) / model.currZoom;
              ey = (targetBounds.top - oy + (targetBounds.height * .5)) / model.currZoom;

              drawWire(model.wiresDrawArea.graphics, sx, sy, ex, ey);
            }
          }
        });
      });
    }
    model.canvas.update();
  },

  onKeyDown: (model, event, action) => {
    console.log('onKeyDown',event);
    if(event.keyCode === 32 && event.target == document.body) {
      event.preventDefault();
      action.setDragStage(true);
    }
    if(event.ctrlKey && event.keyCode === 187) {
      event.preventDefault();
      action.onZoomIn();
    }
    if(event.ctrlKey && event.keyCode === 189) {
      event.preventDefault();
      action.onZoomOut();
    }
  },

  onKeyUp: (model, event, action) => {
    //console.log('onKeyUp:', event.code);
    if(event.keyCode === 32) {
      action.setDragStage(false);
    }
  },

  dragWire: (model, {node, event, wireType}, action) => {
    //console.log('dragWire');
    let tempId = node.getWires(wireType)[0] || null;
    let bounds = getDivBounds(node.getId());
    let x = bounds.right - model.stageX + model.currStage.scrollLeft;
    let y = bounds.top + (bounds.height * .5) - model.stageY + model.currStage.scrollTop;

    if(tempId !== null) node.removeWire(wireType,tempId);
    action.setTempWire({type:wireType, id: tempId});
    action.setDragNode(node);
    action.setWirePosition({x,y});
    action.moveWire({ x: event.pageX, y: event.pageY});
  },

  dragNode: (model, {node, event}, action) => {
    let id = node.getId();
    let len = model.currDialogNode.getChildren().length;

    model.currDialogNode.setChildIndex(id,len-1);
    action.setDragOffset({x:event.offsetX, y:event.offsetY});
    action.setDragNode(node);
  },

  dragStage: (model, {event}, action) => {
    //console.log('drag stage');
    action.setDragOffset({x:event.offsetX, y:event.offsetY});
  },

  onDragHandler: (model, { node, event, wireType, dragType }, action) => {
    event.preventDefault();
    event.stopPropagation();
    //console.log('onDragHandler',dragType)
    action.setDragType(dragType);
    if (dragType === 'wire') {
      action.dragWire({node, event, wireType});
      action.updateStage();
    } else if (dragType === 'node') {
      action.dragNode({node, event});
      action.updateStage();
    } else if (dragType === 'stage' && model.stageDragging) {
      action.dragStage({event});
    }

  },

  dropWire: (model, data, action) => {
    if(model.highlightId !== '') {
      model.rpgs.setConnection(model.tempWire.type,model.dragNode.getId(),model.highlightId);
    }

    action.setHighlight('');
    action.setDragType('');
    model.tempDrawArea.graphics.clear();
    return { dragNode: null, tempWire: null };
  },

  dropNode: (model, data, action) => {
    action.setDragNode(null);
    action.setDragType('');
  },

  dropStage: (model, data, action) => {
    action.setDragType('');
  },

  onDropHandler: (model, data, action) => {
    event.stopPropagation();
    //console.log('onDropHandler',model.dragType);
    if(model.dragType === 'wire') {
      action.dropWire();
    } else if(model.dragType === 'node'){
      action.dropNode();
    } else if(model.dragType === 'stage' && model.stageDragging) {
      action.dropStage();
    }

    action.updateStage();
  },

  moveWire: (model, {x, y}, action) => {
    //console.log('moveWire');
    let sx = model.wireX / model.currZoom;
    let sy = model.wireY / model.currZoom;
    let ex = (x - model.stageX + model.currStage.scrollLeft - 6) / model.currZoom;
    let ey = (y - model.stageY + model.currStage.scrollTop) / model.currZoom;

    action.setHighlight('');
    model.currDialogNode.getChildren().forEach(child => {
      let id = child.getId();
      let b = getDivBounds(id);
      if(x >= b.left && x <= b.right && y >= b.top && y <= b.bottom) {
        action.setHighlight(id);
      }
    });
    model.tempDrawArea.graphics.clear();
    drawWire(model.tempDrawArea.graphics, sx, sy, ex, ey);
    model.canvas.update();
  },

  moveNode: (model, {x, y}) => {
    let nx = (x + model.currStage.scrollLeft - model.stageX) / model.currZoom - model.offsetX;
    let ny = (y + model.currStage.scrollTop - model.stageY) / model.currZoom - model.offsetY;
    model.dragNode.x = nx < 0 ? 0 : nx;
    model.dragNode.y = ny < 0 ? 0 : ny;
    return model;
  },

  moveStage: (model, {x,y}, action) => {
    model.currStage.scrollLeft = -x + model.stageX + (model.offsetX) * model.currZoom;
    model.currStage.scrollTop = -y + model.stageY + (model.offsetY) * model.currZoom ;
  },

  onMoveHandler: (model, data, action) => {
    //console.log('onMoveHandler',model.dragType);
    //event.stopPropagation();
    //if(model.dragNode !== null) {
      if(model.dragType === 'wire') {
        action.moveWire(data);
      } else if (model.dragType === 'node') {
        action.moveNode(data);
        action.updateStage();
      } else if (model.dragType === 'stage' && model.stageDragging) {
        action.moveStage(data);
      }

    //}
  },

  saveFile: (model, data, action) => {
    let serialized = model.rpgs.serialize();
    let filename = 'rpgs-data';
    let blob = new Blob([serialized], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, filename+".json");
  },

  loadFile: (model, data, action) => {
    let files = document.getElementById('selectFiles').files;
    //console.log(files);
    if (files.length <= 0) {
      return false;
    }
    let fr = new FileReader();

    fr.onload = function(e) {
      action.setLoadingFile(false);
      action.setDialogNode(null);
      model.rpgs.setData(e.target.result);
      action.hideModal();
    }
    action.setLoadingFile(true);
    fr.readAsText(files.item(0));
  },

  showLoadFileModal: (model, data, action) => {
    action.setModal(loadFile);
    action.showModal();
  },

  onZoomIn: (model, data, action) => {
    action.zoomIn();
    action.updateStage();
  },

  onZoomOut: (model, data, action) => {
    action.zoomOut();
    action.updateStage();
  },
  setTab: ({ selectedTab }, tab) => {
    return {selectedTab: tab};
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

  setDragType: ({dragType}, type) => {
    return {dragType:type};
  },

  setDragStage: ({stageDragging}, value) => {
    return {stageDragging: value};
  },

  setTempWire: ({tempWire},params) => {
    return {tempWire:params};
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
dialogsActions);

export default actions;
