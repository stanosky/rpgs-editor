'use strict';

import { h } from 'hyperapp';
import RPGS from '../../libs/rpgs';

const view = (model, actions) => {
  let conversation = RPGS.walker.getConversation();
  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Dialog tester</p>
        <button
          className="delete"
          onclick={actions.hideModal}
        ></button>
      </header>
      <section className="modal-card-body">
        <label className="label">{conversation.text}</label>
        {conversation.options.map(answer => (
          <span>
            <a
              id={answer.id}
              class="button is-link"
              onclick={e => actions.dialogTesterSelectOption(e.currentTarget.id)}
            >{answer.text}</a><br />
          </span>)
        )}
      </section>
      <footer className="modal-card-foot">
        <a
          className="button"
          onclick={actions.hideModal}
        >Close</a>
      </footer>
    </div>
  );
}
export default view;
