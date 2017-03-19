'use strict';

import { h } from 'hyperapp';

const view = (model, actions) => (
    <div className="modal-card"
      onCreate={actions.clearLabelCheck}
    >
      <header className="modal-card-head">
        <p className="modal-card-title">Create new dialog</p>
        <button
          className="delete"
          onclick={actions.hideModal}
        ></button>
      </header>
      <section className="modal-card-body">
        <label className="label">Dialog label</label>
        <p className="control has-icon has-icon-right">
          <input
            id="nodeLabelInput"
            className={"input "
              + (model.labelAlreadyExist ? "is-danger" : "is-success")
            }
            type="text"
            placeholder="Text input"
            value=""
            oninput={e => actions.onDialogLabelChange(e.target.value)}
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
          >Dialog with that label already exists</span>
        </p>
      </section>
      <footer className="modal-card-foot">
        <a
          className={"button "
            + (model.labelAlreadyExist ? "is-disabled" : "is-success")
          }
          onclick={actions.commitEditDialogModal}
        >Ok</a>
        <a
          className="button"
          onclick={actions.hideModal}
        >Cancel</a>
      </footer>
    </div>
);

export default view;
