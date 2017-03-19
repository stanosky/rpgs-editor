'use strict';

const rpgsMain = new rpgs.RPGSystem();
const rpgsTemp = new rpgs.RPGSystem();
const walker = new rpgs.DialogWalker(rpgsMain);

const RPGS = {
  selected: {

  },
  main: rpgsMain,
  temp: rpgsTemp,
  walker
};

export default RPGS;
