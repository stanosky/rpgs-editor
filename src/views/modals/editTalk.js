'use strict';

import { h } from 'hyperapp';

const answerItems = (model, action) => {
  let tempNode = model.rpgs.findNode(model.tempNodeId);
  let answers = tempNode.getChildren();

  return answers.map(a => {
    let answerNode = model.rpgs.findNode(a);

    return (
      <div class="columns">
        <div class="column is-11">
          <input
            className="input"
            type="text"
            placeholder="Answer"
            value={answerNode.getText()}
            onInput=""
          ></input>
        </div>
        <div class="column">
          <a
            id={a}
            className="button"
            onclick={e => action.removeAnswer(e.currentTarget.id)}
          >
            <span class="icon is-small">
              <i class="fa fa-minus"></i>
            </span>
          </a>
        </div>
      </div>
    );
  });
}

const view = (model, action) => (
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
        <label class="label">Talk</label>
        <p class="control">
          <textarea class="textarea" placeholder="Textarea"></textarea>
        </p>
        <label class="label">Answers</label>

        {answerItems(model, action)}

        <p class="control">
          <a
            className="button"
            onclick={action.addAnswer}
          >
            <span class="icon is-small">
              <i class="fa fa-plus"></i>
            </span>
            Add answer
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

export default view;
