'use strict';

import {RPGSystem} from '../../../rpgs/rpgs/build/rpgs.min';
import dialogsModel from './dialogsModel';

const testData = '[{"class":"DialogNode","uuid":"dlg1","label":"Dialog-dlg1","wires":{"visible":[],"enabled":[]},"params":{},"x":0,"y":0,"children":["t1","t5","t6","t7","t4","t3","t0","t2"],"startTalk":"t0"},{"class":"TalkNode","uuid":"t7","label":"Talk-t7","wires":{"visible":[],"enabled":[]},"params":{},"x":1674,"y":398,"children":["698e584f-9a5b-465e-a9f1-dcd66e339c0a","aa04f85c-3367-4560-b9af-23e4455b6da2"],"text":"I there anything else I can do for you?"},{"class":"AnswerNode","uuid":"698e584f-9a5b-465e-a9f1-dcd66e339c0a","label":"Answer-698e","wires":{"visible":[],"enabled":[],"goto":["t4"]},"params":{},"x":0,"y":0,"text":"[Investigate]"},{"class":"AnswerNode","uuid":"aa04f85c-3367-4560-b9af-23e4455b6da2","label":"Answer-aa04","wires":{"visible":[],"enabled":[],"goto":[]},"params":{},"x":0,"y":0,"text":"Goodbye."},{"class":"TalkNode","uuid":"t6","label":"Talk-t6","wires":{"visible":[],"enabled":[]},"params":{},"x":1671,"y":203,"children":["5fd9b8b5-51aa-4841-a5ab-7e78eef51152"],"text":"A while."},{"class":"AnswerNode","uuid":"5fd9b8b5-51aa-4841-a5ab-7e78eef51152","label":"Answer-5fd9","wires":{"visible":[],"enabled":[],"goto":["t4"]},"params":{},"x":0,"y":0,"text":"[Investigate]"},{"class":"TalkNode","uuid":"t5","label":"Talk-t5","wires":{"visible":[],"enabled":[]},"params":{},"x":1669,"y":7,"children":["b0735c9e-e8e8-4820-847d-ad211d29c46b"],"text":"Hm... black."},{"class":"AnswerNode","uuid":"b0735c9e-e8e8-4820-847d-ad211d29c46b","label":"Answer-b073","wires":{"visible":[],"enabled":[],"goto":["t4"]},"params":{},"x":0,"y":0,"text":"[Investigate]"},{"class":"TalkNode","uuid":"t4","label":"Talk-t4","wires":{"visible":[],"enabled":[]},"params":{},"x":1268,"y":179,"children":["992ee8d1-4907-48a8-b87a-1832561b1c81","4684d917-a7d3-461f-aef4-aa91a3096c99","9394f355-fbf8-48ac-b211-4b50e5353397"],"text":"..."},{"class":"AnswerNode","uuid":"992ee8d1-4907-48a8-b87a-1832561b1c81","label":"Answer-992e","wires":{"visible":[],"enabled":[],"goto":["t5"]},"params":{},"x":0,"y":0,"text":"What is your favorite color?"},{"class":"AnswerNode","uuid":"4684d917-a7d3-461f-aef4-aa91a3096c99","label":"Answer-4684","wires":{"visible":[],"enabled":[],"goto":["t6"]},"params":{},"x":0,"y":0,"text":"How long have you been here?"},{"class":"AnswerNode","uuid":"9394f355-fbf8-48ac-b211-4b50e5353397","label":"Answer-9394","wires":{"visible":[],"enabled":[],"goto":["t7"]},"params":{},"x":0,"y":0,"text":"Nevermind."},{"class":"TalkNode","uuid":"t3","label":"Talk-t3","wires":{"visible":[],"enabled":[]},"params":{},"x":874,"y":183,"children":["1df505e9-ad86-4724-9f24-ce0630edd17e","c77843c2-599f-4573-ab93-bbe435ac6983"],"text":"I`m the dialog guy of course!"},{"class":"AnswerNode","uuid":"1df505e9-ad86-4724-9f24-ce0630edd17e","label":"Answer-1df5","wires":{"visible":[],"enabled":[],"goto":["t4"]},"params":{},"x":0,"y":0,"text":"[Investigate]"},{"class":"AnswerNode","uuid":"c77843c2-599f-4573-ab93-bbe435ac6983","label":"Answer-c778","wires":{"visible":[],"enabled":[],"goto":[]},"params":{},"x":0,"y":0,"text":"Goodbye."},{"class":"TalkNode","uuid":"t2","label":"Talk-t2","wires":{"visible":[],"enabled":[]},"params":{},"x":449,"y":253,"children":["a203eaee-cf7f-4ed4-a532-cf12742f08db"],"text":"I`m sorry to hear that."},{"class":"AnswerNode","uuid":"a203eaee-cf7f-4ed4-a532-cf12742f08db","label":"Answer-a203","wires":{"visible":[],"enabled":[],"goto":["t3"]},"params":{},"x":0,"y":0,"text":"So who are you anyway?"},{"class":"TalkNode","uuid":"t1","label":"Talk-t1","wires":{"visible":[],"enabled":[]},"params":{},"x":446,"y":54,"children":["7ec96634-f0a0-45b2-9897-26f4d25b4437"],"text":"That`s great! Glad to hear it!"},{"class":"AnswerNode","uuid":"7ec96634-f0a0-45b2-9897-26f4d25b4437","label":"Answer-7ec9","wires":{"visible":[],"enabled":[],"goto":["t3"]},"params":{},"x":0,"y":0,"text":"So who are you anyway?"},{"class":"TalkNode","uuid":"t0","label":"Talk-t0","wires":{"visible":[],"enabled":[]},"params":{},"x":20,"y":145,"children":["cc3f8b86-2b0a-47fe-9c52-9d03870ddb29","67b8067d-6980-47ec-bc3a-cb911292f2bb","eb90b9d7-8707-4699-8986-358a7690b6ad"],"text":"Hello there! How are you?"},{"class":"AnswerNode","uuid":"cc3f8b86-2b0a-47fe-9c52-9d03870ddb29","label":"Answer-cc3f","wires":{"visible":[],"enabled":[],"goto":["t1"]},"params":{},"x":0,"y":0,"text":"I`m weel, thank you."},{"class":"AnswerNode","uuid":"67b8067d-6980-47ec-bc3a-cb911292f2bb","label":"Answer-67b8","wires":{"visible":[],"enabled":[],"goto":["t2"]},"params":{},"x":0,"y":0,"text":"Meh, been better."},{"class":"AnswerNode","uuid":"eb90b9d7-8707-4699-8986-358a7690b6ad","label":"Answer-eb90","wires":{"visible":[],"enabled":[],"goto":["t2"]},"params":{},"x":0,"y":0,"text":"I`m grumpy."}]';
const rpgs = new RPGSystem();
rpgs.setData(testData);


const model = Object.assign({
  rpgs,
  tempRpgs: new RPGSystem(),
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
