const update = {
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
  showAddDialogModal: ({isAddDialogVisible}) => ({ isAddDialogVisible: true}),
  hideAddDialogModal: ({isAddDialogVisible}) => ({ isAddDialogVisible: false}),
  addDialog: ({rpgs,isAddDialogVisible}) => {
    rpgs.addNode('DialogNode',{},false);
    //console.log(rpgs.serializeData());
    return {rpgs,isAddDialogVisible:false};
  },
  deleteDialog: ({rpgs}, e) => {
    rpgs.removeNode(e.currentTarget.id);
    return {rpgs};
  }
};

export default update;
