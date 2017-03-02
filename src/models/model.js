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
  offsetX: 0,
  offsetY: 0,
  dragging: false,
  loadingFile: false
},
dialogsModel);

export default model;
