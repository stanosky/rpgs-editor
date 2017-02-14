import {RPGSystem} from '../../../rpgs/rpgs/build/rpgs.min';

const model = {
  rpgs: new RPGSystem(),
  tabs: ['Dialogs','Actors','Quests','Variables','Scripts'],
  selectedTab: 'Dialogs',
  isAddDialogVisible: false,
};

export default model;
