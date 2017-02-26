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

  setModal: ({ modalView }, view) => ({modalView: view}),

  showModal: ({ modalVisible }) => {
    return { modalVisible: true};
  },

  hideModal: ({tempRpgs, tempNode, modalVisible, modalView }) => {
    //if(tempNode !== '') rpgs.removeNode(tempNode);
    tempRpgs.clearData();
    return {tempRpgs, tempNode: null, modalVisible: false, modalView: null};
  },

  setTempNode: ({tempNode}, node) => {
    //console.log('setTempNode',node);
    return {tempNode: node}
  },
},
dialogsUpdates);

export default update;
