'use strict';

import {Utils} from '../../../rpgs/rpgs/build/rpgs.min';

const effects = {
  getRandomName: (model,msg,prefix) => prefix + (Utils.getUUID().substr(0, 4))
};

export default effects;
