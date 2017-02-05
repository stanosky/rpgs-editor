'use strict';
import { html } from 'hyperapp';
import nodeItem from './nodeItem';

const view = (model, msg) => (html`
  <ul id="nav-mobile" class="side-nav fixed" style="transform: translateX(0%);">
    ${model.rpgs.getDialogs().map(d => nodeItem(model,d.getId()))}
  </ul>
`);

export default view;
