'use strict';

import {RPGSystem} from '../../../rpgs/rpgs/build/rpgs.min';
import dialogsModel from './dialogsModel';

const model = Object.assign({
  rpgs: new RPGSystem(),
  tabs: ['Dialogs','Actors','Quests','Variables','Scripts'],
  selectedTab: 'Dialogs',
  modalVisible: false,
  modalType: '',
},
dialogsModel);

export default model;
