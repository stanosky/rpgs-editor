'use strict';

const rpgsMain = new rpgs.RPGSystem();
const rpgsTemp = new rpgs.RPGSystem();
const walker = new rpgs.DialogWalker(rpgsMain);

const RPGS = {
  main: rpgsMain,
  temp: rpgsTemp,
  walker,
  utils: rpgs.Utils,
};

export default RPGS;
