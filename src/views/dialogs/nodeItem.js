'use strict';
import { html } from 'hyperapp';

const view = (model, msg) => (html`
  <li><a href="#!">${msg}</a></li>
`);

export default view;
