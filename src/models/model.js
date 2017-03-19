'use strict';
import dialogsModel from './dialogsModel';

const model = Object.assign({
  tabs: ['Dialogs','Actors','Quests','Variables','Scripts'],
  selectedTab: 'Dialogs',
  labelAlreadyExist: false,
  modalVisible: false,
  modalView: null,
  tempNode: null,
  tempNodeData: null,
  tempWire: null,
  tempDrawArea: null,
  wiresDrawArea: null,
  wireX: 0,
  wireY: 0,
  dragNode: null,
  dragType: '',
  offsetX: 0,
  offsetY: 0,
  stageDragging: false,
  loadingFile: false,
  currStage: null,
  stageX: 300,
  stageY: 49,
  stageWidth: 4096,
  stageHeight: 4096,
  highlightId: '',
  minZoom: 0.5,
  currZoom: 1,
  maxZoom: 2,
  canvas: null
},
dialogsModel);

export default model;
