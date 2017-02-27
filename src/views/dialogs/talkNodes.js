'use strict';

import { h } from 'hyperapp';

const view = (model, action) => {
  let children = model.currDialogNode !== null ? model.currDialogNode.getChildren() : [];
  //let talkNodes = talkNodesIds.map(id => model.rpgs.findNode(id));
  //console.log('czy równe:',model.rpgs === model.tempRpgs);
  //console.log('talkNodesIds',talkNodesIds);
  return children.map(childId => {
    let node = model.rpgs.findNode(childId);
    return node !== null ? (
      <div class="card talk-node">
        <header class="card-header">
          <p class="card-header-title">
            {node.getLabel()}
          </p>
          <a
            data-id={node.getId()}
            class="card-header-icon"
            onclick={e => action.showRemoveTalkModal(e.currentTarget['data-id'])}
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
            console.log('answerId',answerId);
            let answerNode = model.rpgs.findNode(answerId);
            return (<footer class="card-footer">{answerNode.getText()}</footer>);
          })}
        </div>
      </div>
    ) : '';
  });
};

export default view;
