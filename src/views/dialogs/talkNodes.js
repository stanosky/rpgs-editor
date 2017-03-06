'use strict';

import { h } from 'hyperapp';

const view = (model, action) => {
  let children = [];
  let startTalk = '';

  if(model.currDialogNode !== null) {
    children = model.currDialogNode.getChildren();
    startTalk = model.currDialogNode.getStartTalk();
  }

  return children.map(node => {
    let nodeId = node.getId();

    return node !== null ? (
      <div
        id={nodeId}
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
            onMouseDown={e => action.onDragHandler({dragNode: node, event: e})}
          >
            {node.getLabel()}
          </p>
          <a
            data-id={nodeId}
            className="card-header-icon"
            onclick={e => model.currDialogNode.setStartTalk(e.currentTarget['data-id'])}
          >
            <span className="icon">
              <i className={"fa fa-star"+(startTalk === nodeId ? "" : "-o")}></i>
            </span>
          </a>
          <a
            data-id={nodeId}
            className="card-header-icon"
            onclick={e => action.showRemoveTalkModal(e.currentTarget['data-id'])}
          >
            <span className="icon">
              <i className="fa fa-trash"></i>
            </span>
          </a>
          <a
            data-id={nodeId}
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
          {node.getChildren().map(answerNode => {
            return (<footer
                      id={answerNode.getId()}
                      className="card-footer"
                    >{answerNode.getText()}</footer>);
          })}
        </div>
      </div>
    ) : '';
  });
};

export default view;
