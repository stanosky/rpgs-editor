'use strict';

import { h } from 'hyperapp';

const answerItems = (model, action) => {
  let answers = model.tempNode !== null ? model.tempNode.getChildren() : [];

  return answers.map(a => {
    let answerNode = model.rpgs.findNode(a);

    return (
      <div className="columns">
        <div className="column is-11">
          <input
            className="input"
            type="text"
            placeholder="Answer"
            value={answerNode.getText()}
            oninput={e => answerNode.setText(e.target.value)}
          ></input>
        </div>
        <div className="column">
          <a
            id={a}
            className="button"
            onclick={e => action.removeAnswer(e.currentTarget.id)}
          >
            <span className="icon">
              <i className="fa fa-trash"></i>
            </span>
          </a>
        </div>
      </div>
    );
  });
}

const view = (model, action) => {
  let tempNode = model.tempNode;

  return (
    <div className="modal-card"
      oncreate={action.clearLabelCheck}
    >
        <header className="modal-card-head">
          <p className="modal-card-title">Edit talk</p>
          <button
            className="delete"
            onclick={action.hideModal}
          ></button>
        </header>
        <section className="modal-card-body">
          <label className="label">Talk label</label>
          <p className="control has-icon has-icon-right">
            <input
              id="nodeLabelInput"
              className={"input "
                + (model.labelAlreadyExist ? "is-danger" : "is-success")
              }
              type="text"
              placeholder="Text input"
              value=""
              oninput={e => action.onTalkLabelChange(e.target.value)}
            ></input>
            <span className="icon is-small">
              <i className={"fa "
                + (model.labelAlreadyExist ? "fa-warning" : "fa-check")
              }></i>
            </span>
            <span
              className={"help "
                + (model.labelAlreadyExist ? "is-danger" : "is-hidden")
              }
            >Talk with that label already exists</span>
          </p>
          <label className="label">Talk</label>
          <p className="control">
            <textarea
              className="textarea"
              placeholder="Actor talk"
              oninput={e => tempNode.setText(e.target.value)}
            >
              {tempNode.getText()}
            </textarea>
          </p>
          <label className="label">Answers</label>

          {answerItems(model, action)}

          <p className="control">
            <a
              className="button"
              onclick={action.addAnswer}
            >
              <span className="icon is-small">
                <i className="fa fa-plus"></i>
              </span>
              <span>Add answer</span>
            </a>
          </p>
        </section>
        <footer className="modal-card-foot">
          <a
            className={"button "
              + (model.labelAlreadyExist ? "is-disabled" : "is-success")
            }
            onclick={action.commitEditTalkModal}
          >Ok</a>
          <a
            className="button"
            onclick={action.hideModal}
          >Cancel</a>
        </footer>
      </div>
  );
}

export default view;
