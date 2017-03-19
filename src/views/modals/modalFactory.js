'use strict';
import editDialog from './editDialog';
import editTalk from './editTalk';
import removeDialog from './removeDialog';
import removeTalk from './removeTalk';
import dialogTester from './dialogTester';
import loadFile from './loadFile';

const factory = function(viewName) {
  let view = null;
  switch (viewName) {
    case 'removeDialog':
      view = removeDialog;
      break;
    case 'removeTalk':
      view = removeTalk;
      break;
    case 'dialogTester':
      view = dialogTester;
      break;
    case 'loadFile':
      view = loadFile;
      break;
    case 'editDialog':
      view = editDialog;
      break;
    case 'editTalk':
      view = editTalk;
      break;
    default:

  }
  return view;
};

export default factory;
