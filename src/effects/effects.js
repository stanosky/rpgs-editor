'use strict';

import {Utils} from '../../../rpgs/rpgs/build/rpgs.min';
import FileSaver from 'file-saver';
import dialogsEffects from './dialogsEffects';
import loadFile from '../views/modals/loadFile';
import {drawWire,getDivBounds,mergeBounds} from '../common/gfx';

const effects = Object.assign({
  initStage: (model, action) => {
    //console.log('initStage');
    action.updateStage();
  },
  updateStage: (model, action) => {
    let stage = document.getElementById('dialogsStage');
    let rect = stage.getBoundingClientRect();
    model.stageWidth = rect.width;
    model.stageHeight = rect.height;
    model.stageScrollWidth = stage.scrollWidth;
    model.stageScrollHeight = stage.scrollHeight;
    model.stageScrollTop = stage.scrollTop;
    model.stageScrollLeft = stage.scrollLeft;
    //console.log('stageSize:',model.stageWidth,model.stageHeight);
    //console.log('scrollSize:',model.stageScrollWidth,model.stageScrollHeight);
    //console.log('scrollPosition',model.stageScrollTop,model.stageScrollLeft);
    action.updateCanvas();
  },
  initCanvas: (model, action) => {
    console.log('initCanvas')
    model.canvas = new createjs.Stage("stage-canvas");
    model.drawWire = new createjs.Shape();
    model.drawArea = new createjs.Shape();
    model.canvas.addChild(model.drawArea);
    model.canvas.addChild(model.drawWire);
    action.updateCanvas();
  },
  updateCanvas: (model, action) => {
    if(model.canvas === null) return;
    action.updateWires();
    model.canvas.update();
  },
  updateWires: (model, action) => {
    //model.canvas.removeAllChildren();
    model.drawArea.graphics.clear();
    if (model.currDialogNode) {
      let talkNodeBounds, answerNodeBounds, targetNodeBounds,
          answerNodes, sx, sy, ex, ey, gotoId, merged,
          talkNodes = model.currDialogNode.getChildren();

      talkNodes.forEach(tn => {
        talkNodeBounds = getDivBounds(tn.getId());
        answerNodes = tn.getChildren();

        answerNodes.forEach(an => {
          gotoId = an.getWires('goto')[0];

          if (gotoId !== undefined) {
            targetNodeBounds = getDivBounds(gotoId);
            answerNodeBounds = getDivBounds(an.getId());
            if(targetNodeBounds && answerNodeBounds) {
              //sx = talkNodeBounds.right - model.stageOffsetLeft + model.stageScrollLeft;
              sx = answerNodeBounds.right - model.stageOffsetLeft + model.stageScrollLeft;
              sy = answerNodeBounds.top + (answerNodeBounds.height * .5) - model.stageOffsetTop + model.stageScrollTop;
              ex = targetNodeBounds.left - model.stageOffsetLeft + model.stageScrollLeft - 6;
              ey = targetNodeBounds.top + (targetNodeBounds.height * .5) - model.stageOffsetTop + model.stageScrollTop;

              model.canvas.addChild(drawWire(model.drawArea.graphics, sx, sy, ex, ey));
            }
          }
        });
      });
    }
  },
  onDragHandler: (model, action, params) => {
    if(params.wireType !== '') {
      action.dragWire(params);
    } else {
      action.dragNode(params);
    }
    action.updateStage();
  },
  onDropHandler: (model, action) => {
    if(model.isWireDrawing) {
      action.dropWire();
    } else {
      action.dropNode();
    }
    action.updateStage();
  },
  onMoveHandler: (model, action, params) => {
    if(model.dragNode !== null) {
      if(model.isWireDrawing) {
        action.moveWire(params);
      } else {
        action.moveNode(params);
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
  }
},
dialogsEffects);

export default effects;
