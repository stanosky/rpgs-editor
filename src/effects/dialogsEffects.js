'use strict';

const effects = {
  showAddDialogModal: (model, action) => {
    action.setupAddDialogModal();
    let input = document.getElementById('dialogLabelInput');
    input.value = action.getRandomName('Dialog-');
    action.showModal();
  },

  commitAddDialogModal: (model, action) => {
    action.addDialog();
    action.hideModal();
  },

  showRemoveDialogModal: (model, action, id) => {
    action.setupRemoveDialogModal();
    let confirmBtn = document.getElementById('confirmBtn');
    console.log('id',id);
    confirmBtn['data-id'] = id;
    action.showModal();
  },

  commitRemoveDialogModal: (model, action, id) => {
    action.removeDialog(id);
    action.hideModal();
  }
};

export default effects;
