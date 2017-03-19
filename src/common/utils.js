'use strict';
import RPGSW from '../libs/rpgsWrapper';


const getRandomLabel = (prefix, id) => prefix + id.substr(0,4);

const setupEditModal = (actions, view, labelPrefix) => {
  let input, label;
  label = RPGSW.tempNode.getLabel();
  actions.setModal(view);
  input = document.getElementById('nodeLabelInput');
  input.value = label || getRandomLabel(labelPrefix, RPGSW.tempNode.getId());
};

module.exports = {
  getRandomLabel,
  setupEditModal
};
