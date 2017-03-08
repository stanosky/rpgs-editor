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
    let showDragBorder = model.dragNode === node || model.highlightId === nodeId;

    return node !== null ? (
      <div
        className={"card talk-node is-unselectable " + (showDragBorder ? "drag-border" : "")}
        style={{
            left: node.x + "px",
            top: node.y + "px"
        }}
      >
        <header className="card-header">
          <p
            className="card-header-title"
            onMouseDown={e => action.onDragHandler({node: node, event: e, wireType:''})}
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
          <div
            id={nodeId}
            className="content"
          >
            {node.getText()}
          </div>
          {node.getChildren().map(answerNode => {
            return (<footer
                      id={answerNode.getId()}
                      className="card-footer"
                    ><a
                      href="#"
                      onMouseDown={e => action.onDragHandler({event:e,
                                    node:answerNode, wireType:'goto',
                                    parentId:node.getId()})}
                     >{answerNode.getText()}</a>
                    </footer>);
          })}
        </div>
      </div>
    ) : '';
  });
};

export default view;
