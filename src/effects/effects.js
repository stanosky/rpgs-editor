'use strict';

import {Utils} from '../../../rpgs/rpgs/build/rpgs.min';
import FileSaver from 'file-saver';
import dialogsEffects from './dialogsEffects';

const effects = Object.assign({
  saveFile: (model, action) => {
    let data = model.rpgs.serialize();
    let filename = 'rpgs-data';
    let blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, filename+".json");
  }
},
dialogsEffects);

export default effects;
