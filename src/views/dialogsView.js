'use strict';
import { html } from 'hyperapp';
import node from './dialogs/node';
import nodeList from './dialogs/nodeList';
//${nodeList(model, msg)}
const view = (model, msg) => (html`
  <div id="dialogsTab" class="col s12">
    ${node(model, msg)}
    <ul id="slide-out1" class="side-nav">

    </ul>
    <a href="#" data-activates="slide-out1" class="button-collapse show-on-large btn-floating btn-large red"><i class="material-icons">menu</i></a>
  </div>
`);

export default view;
