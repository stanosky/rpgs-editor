'use strict';

import { h } from 'hyperapp';

const view = (model, msg) => (
  <div className={"modal" + (model.isAddDialogVisible ? "is-active" : "")}>
    <div className="modal-background"></div>
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Create new dialog</p>
        <button
          className="delete"
          onclick={msg.hideAddDialogModal}
        ></button>
      </header>
      <section className="modal-card-body">
        <label className="label">Dialog label</label>
        <p className="control has-icon has-icon-right">
          <input
            id="dialogLabelInput"
            className={"input "
              + (model.labelAlreadyExist ? "is-danger" : "is-success")
            }
            type="text"
            placeholder="Text input"
            value=""
            onKeyUp={msg.onLabelChange}
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
          >Label with that name already exists</span>
        </p>
      </section>
      <footer className="modal-card-foot">
        <a
          className={"button "
            + (model.labelAlreadyExist ? "is-disabled" : "is-success")
          }
          onclick={msg.addDialog}
        >Ok</a>
        <a
          className="button"
          onclick={msg.hideAddDialogModal}
        >Cancel</a>
      </footer>
    </div>
  </div>
);

export default view;
