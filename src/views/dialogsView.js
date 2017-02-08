'use strict';
import { html } from 'hyperapp';
import node from './dialogs/stage/node';
import nodeList from './dialogs/sidenav/nodeList';
//${nodeList(model, msg)}
/*
<ul id="slide-out" class="side-nav side-nav-tab fixed">
  <li><a href="#!">First Sidebar Link</a></li>
  <li><a href="#!">Second Sidebar Link</a></li>
</ul>
<ul id="slide-out1" class="side-nav">
  ${nodeList(model, msg)}
</ul>
<a href="#" data-activates="slide-out1" class="button-collapse show-on-large btn-floating btn-large red"><i class="material-icons">menu</i></a>
<a href="#" class="show-on-large btn-floating btn-large red"><i class="material-icons">add</i></a>
 */
const view = (model, msg) => (html`
  <div id="dialogsTab" class="editor-tab">
    <div id="dialogs-stage" class="editor-stage">
      ${node(model, msg)}
    </div>

  </div>
`);

export default view;
