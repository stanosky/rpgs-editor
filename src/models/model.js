'use strict';

import {RPGSystem} from '../../../rpgs/rpgs/build/rpgs.min';
import dialogsModel from './dialogsModel';

const model = Object.assign({
  rpgs: new RPGSystem(),
  tempRpgs: new RPGSystem(),
  tabs: ['Dialogs','Actors','Quests','Variables','Scripts'],
  selectedTab: 'Dialogs',
  modalVisible: false,
  modalView: null,
  tempNode: null,
  tempNodeData: null
},
dialogsModel);

export default model;
