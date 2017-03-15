'use strict';

import { h } from 'hyperapp';

const view = (model, action) => {
  let conversation = model.dialogWalker.getConversation();
  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Dialog tester</p>
        <button
          className="delete"
          onclick={action.hideModal}
        ></button>
      </header>
      <section className="modal-card-body">
        <label className="label">{conversation.text}</label>
        {conversation.options.map(answer => (
          <span>
            <a
              id={answer.id}
              class="button is-link"
              onclick={e => action.dialogTesterSelectOption(e.currentTarget.id)}
            >{answer.text}</a><br />
          </span>)
        )}
      </section>
      <footer className="modal-card-foot">
        <a
          className="button"
          onclick={action.hideModal}
        >Close</a>
      </footer>
    </div>
  );
}
export default view;
