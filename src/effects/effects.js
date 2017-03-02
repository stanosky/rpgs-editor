'use strict';

import {Utils} from '../../../rpgs/rpgs/build/rpgs.min';
import FileSaver from 'file-saver';
import dialogsEffects from './dialogsEffects';
import loadFile from '../views/modals/loadFile';

const effects = Object.assign({
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
