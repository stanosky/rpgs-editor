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

  clearLabelCheck: ({labelAlreadyExist}) => ({labelAlreadyExist: false}),

  setModal: ({ modalView }, view) => ({modalView: view}),

  showModal: ({ modalVisible }) => ({ modalVisible: true}),

  hideModal: ({tempRpgs, tempNode, tempNodeData, modalVisible, modalView }) => {
    tempRpgs.clearData();
    return {tempRpgs, tempNode: null, tempNodeData: null, modalVisible: false, modalView: null};
  },

  setTempNode: ({tempNode}, node) => {
    //console.log('setTempNode',node);
    return {tempNode: node}
  },

  setTempNodeData: ({tempNodeData}, data) => {
    //console.log('setTempNodeData',data);
    return {tempNodeData: data}
  },
},
dialogsUpdates);

export default update;
