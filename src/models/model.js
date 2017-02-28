'use strict';

import {RPGSystem} from '../../../rpgs/rpgs/build/rpgs.min';
import dialogsModel from './dialogsModel';

const model = Object.assign({
  rpgs: new RPGSystem(),
  tempRpgs: new RPGSystem(),
  tabs: ['Dialogs','Actors','Quests','Variables','Scripts'],
  selectedTab: 'Dialogs',
  labelAlreadyExist: false,
  modalVisible: false,
  modalView: null,
  tempNode: null,
  tempNodeData: null,
  dragNode: null,
  dragging: false,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 0
},
dialogsModel);

export default model;
