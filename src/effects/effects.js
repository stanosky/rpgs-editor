'use strict';

import {Utils} from '../../../rpgs/rpgs/build/rpgs.min';
import FileSaver from 'file-saver';
import dialogsEffects from './dialogsEffects';
import loadFile from '../views/modals/loadFile';
import {createWire,getDivBounds} from '../common/gfx';

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
    model.canvas = new createjs.Stage("stage-canvas");
    action.updateCanvas();
  },
  updateCanvas: (model, action) => {
    if(model.canvas === null) return;
    action.updateWires();
    model.canvas.update();
  },
  updateWires: (model, action) => {
    model.canvas.removeAllChildren();
    if (model.currDialogNode) {
      let tnb, anb, ttn, answerNodes, sx, sy, ex, ey, gotoId;//, gotoNode;
      let talkNodes = model.currDialogNode.getChildren();
      talkNodes.forEach(tn => {
        tnb = getDivBounds(tn.getId());
        answerNodes = tn.getChildren();
        answerNodes.forEach(an => {
          gotoId = an.getTalk()
          if (gotoId !== undefined) {
            ttn = getDivBounds(gotoId);
            anb = getDivBounds(an.getId());
            sx = tnb.x + tnb.w - model.stageOffsetLeft + model.stageScrollLeft;
            sy = anb.y + (anb.h * .5) - model.stageOffsetTop + model.stageScrollTop;
            ex = ttn.x - model.stageOffsetLeft + model.stageScrollLeft;
            ey = ttn.y + (ttn.h * .5) - model.stageOffsetTop + model.stageScrollTop;
            model.canvas.addChild(createWire(sx, sy, ex, ey));
          }
        });
      });
    }
  },
  onDragHandler: (model, action, params) => {
    action.drag(params);
    action.updateStage();
  },
  onDropHandler: (model, action) => {
    action.drop();
    action.updateStage();
  },
  onMoveHandler: (model, action, params) => {
    if(model.dragNode !== null) {
      action.move(params);
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
