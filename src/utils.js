const getRandomLabel = (prefix, id) => prefix + id.substr(0,4);

const createTempNode = (rpgs, type, params) => {
  rpgs.addNode(type, params, false);
  let nodes = rpgs.getNodes(type);
  let index = nodes.length - 1;
  return nodes[index];
};

module.exports = {getRandomLabel,createTempNode};
