'use strict';

import { h } from 'hyperapp';
import { Utils } from '../../../../rpgs/rpgs/build/rpgs.min';

const view = (model, action) => (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Create new dialog</p>
        <button
          className="delete"
          onclick={action.hideModal}
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
            value={'Dialog-' + (Utils.getUUID().substr(0, 4))}
            onKeyUp={action.onLabelChange}
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
          onclick={action.addDialog}
        >Ok</a>
        <a
          className="button"
          onclick={action.hideModal}
        >Cancel</a>
      </footer>
    </div>
);

export default view;
