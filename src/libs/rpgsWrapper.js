'use strict';

const rpgsMain = new rpgs.RPGSystem();
const rpgsTemp = new rpgs.RPGSystem();
const walker = new rpgs.DialogWalker(rpgsMain);

const RPGSW = {
  main: rpgsMain,
  temp: rpgsTemp,
  walker,
  utils: rpgs.Utils,
  tempNode: null,
  tempNodeData: null,
  getNodeDataList: function(node) {
    return node !== null ? node.getChildren().reduce((prevVal, currVal) => {
      let children = currVal.getChildren();

      if(children.length > 0) {
        return prevVal.concat(getNodeDataList(currVal));
      } else {
        return prevVal.concat(currVal.getData());
      }
    },[node.getData()]) : [];
  },
  createTempNode: function (type, id = '') {
    if(id === '') {
      this.tempNodeData = [];
      this.temp.addNode(type, {});
    } else {
      let nodeToEdit = this.main.findNode(id);
      //console.log('getNodeDataList:',getNodeDataList(nodeToEdit));
      let data = getNodeDataList(nodeToEdit);
      this.tempNodeData = data;
      this.temp.mergeNodes(JSON.stringify(data));
    }
    this.tempNode = this.temp.getNodes()[0];
  },
  mergeTempData: function () {
    let label = document.getElementById('nodeLabelInput').value;

    this.tempNodeData.forEach(n => this.main.removeNode(n.uuid, false));
    this.tempNode.setLabel(label);
    this.main.mergeNodes(this.temp.serialize());
  },
  setTempNode: function (id) {
    this.tempNode = this.main.findNode(id);
  }
};

export default RPGSW;
