'use strict';

const effects = {
  showAddDialogModal: (model, action) => {
    action.clearAddDialogModal();
    let input = document.getElementById('dialogLabelInput');
    input.value = action.getRandomName('Dialog-');
    action.showModal();
  },
  commitAddDialogModal: (model, action) => {
    action.addDialog();
    action.hideModal();
  }
};

export default effects;
