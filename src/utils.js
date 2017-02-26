const getRandomLabel = (prefix, id) => prefix + id.substr(0,4);

const createTempNode = (rpgs, type, params) => {
  rpgs.addNode(type, params, false);
  let nodes = rpgs.getNodes(type);
  let index = nodes.length - 1;
  return nodes[index];
};

const getNodeDataList = (rpgs, node) => {
  return node !== null ? node.getChildren().reduce((prevVal, currVal) => {
    let currNode = rpgs.findNode(currVal);
    let children = currNode.getChildren();

    if(children.length > 0) {
      return prevVal.concat(getNodeDataList(rpgs, currNode));
    } else {
      return prevVal.concat(currNode.getData());
    }
  },[node.getData()]) : [];
};

module.exports = {getRandomLabel, createTempNode, getNodeDataList};
