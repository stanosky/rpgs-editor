'use strict';

import {Utils} from '../../../rpgs/rpgs/build/rpgs.min';
import FileSaver from 'file-saver';
import dialogsEffects from './dialogsEffects';
import loadFile from '../views/modals/loadFile';
import {drawWire,getDivBounds} from '../common/gfx';

const effects = Object.assign({
  updateStage: (model, action) => {
    //console.log('updateStage');
    let stage = document.getElementById('dialogsStage');

    action.setStage(stage);
    action.updateWires();
  },

  initCanvas: (model, action) => {
    //console.log('initCanvas')
    let canvas = new createjs.Stage("stage-canvas");
    let tempDrawArea = new createjs.Shape();
    let wiresDrawArea = new createjs.Shape();

    canvas.addChild(wiresDrawArea);
    canvas.addChild(tempDrawArea);
    action.setCanvas({c:canvas,tda:tempDrawArea,wda:wiresDrawArea});
    action.updateWires();
  },

  updateWires: (model, action) => {
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

  onDragHandler: (model, action, { node, event, parentId, wireType }) => {
    event.preventDefault();

    if(wireType !== '') {
      let tempId = node.getWires(wireType)[0] || null;
      let bounds = getDivBounds(node.getId());
      let x = bounds.right - model.stageX + model.currStage.scrollLeft;
      let y = bounds.top + (bounds.height * .5) - model.stageY + model.currStage.scrollTop;

      if(tempId !== null) node.removeWire(wireType,tempId);
      action.setTempWire({type:wireType, id: tempId});
      action.setDragNode(node);
      action.setWirePosition({x,y});
    } else {
      let id = node.getId();
      let len = model.currDialogNode.getChildren().length;

      model.currDialogNode.setChildIndex(id,len-1);
      action.setDragOffset({x:event.offsetX,y:event.offsetY});
      action.setDragNode(node);
    }
    action.updateStage();
  },

  onDropHandler: (model, action) => {
    if(model.isWireDrawing) {
      action.dropWire();
    } else {
      action.setDragNode(null);
    }
    action.updateStage();
  },

  onMoveHandler: (model, action, { x, y }) => {
    if(model.dragNode !== null) {
      if(model.isWireDrawing) {
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
      } else {
        action.setNodePosition({x,y});
      }
      action.updateStage();
    }
  },

  saveFile: (model, action) => {
    let data = model.rpgs.serialize();
    let filename = 'rpgs-data';
    let blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, filename+".json");
  },

  loadFile: (model, action) => {
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
      action.initStage();
    }
    action.setLoadingFile(true);
    fr.readAsText(files.item(0));
  },

  showLoadFileModal: (model, action) => {
    action.setModal(loadFile);
    action.showModal();
  },

  onZoomIn: (model, action) => {
    action.zoomIn();
    action.updateStage();
  },

  onZoomOut: (model, action) => {
    action.zoomOut();
    action.updateStage();
  }
},
dialogsEffects);

export default effects;
