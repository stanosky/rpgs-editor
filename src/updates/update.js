'use strict';

import dialogsUpdates from './dialogsUpdates';

const update = Object.assign({
  switchTab: ({ selectedTab }, e) => {
    let clickedTab = e.currentTarget.id;
    let oldTab = document.getElementById(selectedTab);
    let newTab = document.getElementById(clickedTab);

    if(clickedTab !== selectedTab) {
      oldTab.classList.remove('is-active');
      newTab.classList.add('is-active');
    }
    return {selectedTab: clickedTab};
  },

  showModal: ({ modalVisible }) => {
    //console.log('showModal', modalVisible);
    return { modalVisible: true};
  },

  hideModal: ({ modalVisible }) => {
    //console.log('hideModal', modalVisible);
    return { modalVisible: false};
  },
},
dialogsUpdates);

export default update;
