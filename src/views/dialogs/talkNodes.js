'use strict';

import { h } from 'hyperapp';

const view = (model, action) => {
  let talkNodesIds = model.currDialogNode !== null ? model.currDialogNode.getChildren() : [];
  let talkNodes = talkNodesIds.map(id => model.rpgs.findNode(id));
  //console.log('talkNodesIds',talkNodesIds);
  return talkNodes.map(node => {
    return (
      <div class="card talk-node">
        <header class="card-header">
          <p class="card-header-title">
            {node.getLabel()}
          </p>
          <a
            class="card-header-icon"
            onClick={action.showRemoveTalkModal}
          >
            <span class="icon">
              <i class="fa fa-trash"></i>
            </span>
          </a>
          <a
            data-id={node.getId()}
            class="card-header-icon"
            onclick={e => action.showEditTalkModal(e.currentTarget['data-id'])}
          >
            <span class="icon">
              <i class="fa fa-pencil"></i>
            </span>
          </a>
        </header>
        <div class="card-content">
          <div class="content">
            {node.getText()}
          </div>
          {node.getChildren().map(answerId => {
            let answerNode = model.rpgs.findNode(answerId);
            return (<footer class="card-footer">{answerNode.getText()}</footer>);
          })}
        </div>
      </div>
    );
  });
};

export default view;
