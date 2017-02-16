'use strict';

import {Utils} from '../../../rpgs/rpgs/build/rpgs.min';

const effects = {
  getRandomName: (model, msg, prefix) => {
    return prefix + (Utils.getUUID().substr(0, 4))
  },
  modalBody: (model, msg) => {
    /*switch (model.modalType) {
      case 'addDialog':
        return addDialog(model, msg);
        break;
      default:
        return '';
    }*/
    return '';
  }
};

export default effects;
