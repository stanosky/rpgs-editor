'use strict';

import { h } from 'hyperapp';

const view = (model, action) => {
  let children = model.currDialogNode !== null ? model.currDialogNode.getChildren() : [];

  return children.map(childId => {
    let node = model.rpgs.findNode(childId);

    return node !== null ? (
      <div
        className={"card talk-node " + (model.dragNode === node ? "drag-border" : "")}
        style={{
            left: node.x + "px",
            top: node.y + "px",
            'z-index': model.dragNode === node ? 1 : 0
        }}
      >
        <header className="card-header">
          <p
            className="card-header-title"
            onMouseDown={e => action.drag({dragNode: node, event: e})}
          >
            {node.getLabel()}
          </p>
          <a
            data-id={node.getId()}
            className="card-header-icon"
            onclick={e => action.showRemoveTalkModal(e.currentTarget['data-id'])}
          >
            <span className="icon">
              <i className="fa fa-trash"></i>
            </span>
          </a>
          <a
            data-id={node.getId()}
            className="card-header-icon"
            onclick={e => action.showEditTalkModal(e.currentTarget['data-id'])}
          >
            <span className="icon">
              <i className="fa fa-pencil"></i>
            </span>
          </a>
        </header>
        <div className="card-content">
          <div className="content">
            {node.getText()}
          </div>
          {node.getChildren().map(answerId => {
            //console.log('answerId',answerId);
            let answerNode = model.rpgs.findNode(answerId);
            return (<footer className="card-footer">{answerNode.getText()}</footer>);
          })}
        </div>
      </div>
    ) : '';
  });
};

export default view;
