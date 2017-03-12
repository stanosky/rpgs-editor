import { h } from 'hyperapp';
import dialogs from './dialogs/dialogs';
import actors from './actors/actors';

const view = ((model, actions) => {
  return {
    "/":<div>none</div>,
    "/dialogs": (model, actions) => dialogs(model, actions),
    "/actors": (model, actions) => actors(model, actions),
  };
})();

export default view;
