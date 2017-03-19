'use strict';

import FileSaver from 'file-saver';
import dialogsActions from './dialogsActions';
import loadFile from '../views/modals/loadFile';
import {drawWire,getDivBounds} from '../common/gfx';
import RPGSW from '../libs/rpgsWrapper';

const actions = Object.assign({
  switchTab: (model, e, actions) => {
    let clickedTab = e.currentTarget.id;
    let oldTab = document.getElementById(model.selectedTab);
    let newTab = document.getElementById(clickedTab);
    //console.log('switchTab',clickedTab);
    if(clickedTab !== model.selectedTab) {
      oldTab.classList.remove('is-active');
      newTab.classList.add('is-active');
      actions.setTab(clickedTab);
      //console.log('actions.router',actions.router);
      //actions.router.go("/"+clickedTab);
      actions.updateStage();
    }
  },

  initStage: (model, data, actions) => {
    console.log('initStage');
    let stage = document.getElementById('dialogsStage');

    actions.setStage(stage);
  },


  updateStage: (model, data, actions) => {
    //console.log('updateStage');
    actions.updateWires();
  },

  initCanvas: (model, data, actions) => {
    //console.log('initCanvas')
    let canvas = new createjs.Stage("stage-canvas");
    let tempDrawArea = new createjs.Shape();
    let wiresDrawArea = new createjs.Shape();

    canvas.addChild(wiresDrawArea);
    canvas.addChild(tempDrawArea);
    actions.setCanvas({c:canvas,tda:tempDrawArea,wda:wiresDrawArea});
    actions.updateWires();
  },

  updateWires: (model, data, actions) => {
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

  onKeyDown: (model, event, actions) => {
    console.log('onKeyDown',event);
    if(event.keyCode === 32 && event.target == document.body) {
      event.preventDefault();
      actions.setDragStage(true);
    }
    if(event.ctrlKey && event.keyCode === 187) {
      event.preventDefault();
      actions.onZoomIn();
    }
    if(event.ctrlKey && event.keyCode === 189) {
      event.preventDefault();
      actions.onZoomOut();
    }
  },

  onKeyUp: (model, event, actions) => {
    //console.log('onKeyUp:', event.code);
    if(event.keyCode === 32) {
      actions.setDragStage(false);
    }
  },

  dragWire: (model, {node, event, wireType}, actions) => {
    //console.log('dragWire');
    let tempId = node.getWires(wireType)[0] || null;
    let bounds = getDivBounds(node.getId());
    let x = bounds.right - model.stageX + model.currStage.scrollLeft;
    let y = bounds.top + (bounds.height * .5) - model.stageY + model.currStage.scrollTop;

    if(tempId !== null) node.removeWire(wireType,tempId);
    actions.setTempWire({type:wireType, id: tempId});
    actions.setDragNode(node);
    actions.setWirePosition({x,y});
    actions.moveWire({ x: event.pageX, y: event.pageY});
  },

  dragNode: (model, {node, event}, actions) => {
    let id = node.getId();
    let len = model.currDialogNode.getChildren().length;

    model.currDialogNode.setChildIndex(id,len-1);
    actions.setDragOffset({x:event.offsetX, y:event.offsetY});
    actions.setDragNode(node);
  },

  dragStage: (model, {event}, actions) => {
    //console.log('drag stage');
    actions.setDragOffset({x:event.offsetX, y:event.offsetY});
  },

  onDragHandler: (model, { node, event, wireType, dragType }, actions) => {
    event.preventDefault();
    event.stopPropagation();
    //console.log('onDragHandler',dragType)
    actions.setDragType(dragType);
    if (dragType === 'wire') {
      actions.dragWire({node, event, wireType});
      actions.updateStage();
    } else if (dragType === 'node') {
      actions.dragNode({node, event});
      actions.updateStage();
    } else if (dragType === 'stage' && model.stageDragging) {
      actions.dragStage({event});
    }

  },

  dropWire: (model, data, actions) => {
    if(model.highlightId !== '') {
      RPGSW.main.setConnection(model.tempWire.type,model.dragNode.getId(),model.highlightId);
    }

    actions.setHighlight('');
    actions.setDragType('');
    model.tempDrawArea.graphics.clear();
    return { dragNode: null, tempWire: null };
  },

  dropNode: (model, data, actions) => {
    actions.setDragNode(null);
    actions.setDragType('');
  },

  dropStage: (model, data, actions) => {
    actions.setDragType('');
  },

  onDropHandler: (model, data, actions) => {
    event.stopPropagation();
    //console.log('onDropHandler',model.dragType);
    if(model.dragType === 'wire') {
      actions.dropWire();
    } else if(model.dragType === 'node'){
      actions.dropNode();
    } else if(model.dragType === 'stage' && model.stageDragging) {
      actions.dropStage();
    }

    actions.updateStage();
  },

  moveWire: (model, {x, y}, actions) => {
    //console.log('moveWire');
    let sx = model.wireX / model.currZoom;
    let sy = model.wireY / model.currZoom;
    let ex = (x - model.stageX + model.currStage.scrollLeft - 6) / model.currZoom;
    let ey = (y - model.stageY + model.currStage.scrollTop) / model.currZoom;

    actions.setHighlight('');
    model.currDialogNode.getChildren().forEach(child => {
      let id = child.getId();
      let b = getDivBounds(id);
      if(x >= b.left && x <= b.right && y >= b.top && y <= b.bottom) {
        actions.setHighlight(id);
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

  moveStage: (model, {x,y}, actions) => {
    model.currStage.scrollLeft = -x + model.stageX + (model.offsetX) * model.currZoom;
    model.currStage.scrollTop = -y + model.stageY + (model.offsetY) * model.currZoom ;
  },

  onMoveHandler: (model, data, actions) => {
    //console.log('onMoveHandler',model.dragType);
    //event.stopPropagation();
    //if(model.dragNode !== null) {
      if(model.dragType === 'wire') {
        actions.moveWire(data);
      } else if (model.dragType === 'node') {
        actions.moveNode(data);
        actions.updateStage();
      } else if (model.dragType === 'stage' && model.stageDragging) {
        actions.moveStage(data);
      }

    //}
  },

  saveFile: (model, data, actions) => {
    let serialized = RPGSW.main.serialize();
    let filename = 'rpgs-data';
    let blob = new Blob([serialized], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, filename+".json");
  },

  loadFile: (model, data, actions) => {
    let files = document.getElementById('selectFiles').files;
    //console.log(files);
    if (files.length <= 0) {
      return false;
    }
    let fr = new FileReader();

    fr.onload = function(e) {
      actions.setLoadingFile(false);
      actions.setDialogNode(null);
      RPGSW.main.setData(e.target.result);
      actions.hideModal();
    }
    actions.setLoadingFile(true);
    fr.readAsText(files.item(0));
  },

  showLoadFileModal: (model, data, actions) => {
    actions.setModal(loadFile);
    actions.showModal();
  },

  onZoomIn: (model, data, actions) => {
    actions.zoomIn();
    actions.updateStage();
  },

  onZoomOut: (model, data, actions) => {
    actions.zoomOut();
    actions.updateStage();
  },
  setTab: ({ selectedTab }, tab) => {
    return {selectedTab: tab};
  },

  clearLabelCheck: ({labelAlreadyExist}) => ({labelAlreadyExist: false}),

  setModal: ({ modalView }, view) => ({modalView: view}),

  showModal: ({ modalVisible }) => ({ modalVisible: true}),

  hideModal: ({tempNode, tempNodeData, modalVisible, modalView }) => {
    console.log('hideModal');
    RPGSW.temp.clearData();
    return {tempNode: null, tempNodeData: null, modalVisible: false, modalView: null};
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
    let rect = stage.getBoundingClientRect();
    console.log('setStage',rect);
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

  update: (model) => model
},
dialogsActions);

export default actions;
