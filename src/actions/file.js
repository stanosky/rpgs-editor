'use strict';

import FileSaver from 'file-saver';
import RPGSW from '../libs/rpgsWrapper';

const actions = {
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
    actions.setModal('loadFile');
    actions.showModal();
  },

  setLoadingFile: ({loadingFile}, value) => ({loadingFile: value}),
};

export default actions;
