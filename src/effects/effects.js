'use strict';

import {Utils} from '../../../rpgs/rpgs/build/rpgs.min';
import dialogsEffects from './dialogsEffects';

const effects = Object.assign({
  getRandomName: (model, action, prefix) => {
    return prefix + (Utils.getUUID().substr(0, 4))
  },
},
dialogsEffects);

export default effects;
