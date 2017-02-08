'use strict';
import { html } from 'hyperapp';
import dialogsView from './dialogsView'

const view = (model, msg) => (html`
  <div id="app-root">
    <header>
      <div class="navbar-fixed">
        <nav class="nav-extended">
          <div class="nav-wrapper">
            <a href="#" class="brand-logo">RPGS Editor</a>
            <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li><a href="#">Import</a></li>
              <li><a href="#">Export</a></li>
              <li><a href="#">Settings</a></li>
            </ul>
            <ul class="side-nav" id="mobile-demo">
              <li><a href="#">Import</a></li>
              <li><a href="#">Export</a></li>
              <li><a href="#">Settings</a></li>
            </ul>
          </div>
          <div class="nav-content">
            <ul class="tabs tabs-transparent">
              <li class="tab"><a href="#dialogsTab" class="active">Dialogs</a></li>
              <li class="tab"><a href="#test2">Actors</a></li>
              <li class="tab"><a href="#test3">Inventory</a></li>
              <li class="tab disabled"><a href="#test4">Quests</a></li>
              <li class="tab disabled"><a href="#test5">Scripts</a></li>
              <li class="tab disabled"><a href="#test6">Variables</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
    <main>
      ${dialogsView(model, msg)}
      <div id="test2" class="col s12">
        <ul id="slide-out2" class="side-nav">
          <li><a href="#!">First Sidebar Link</a></li>
          <li><a href="#!">Second Sidebar Link</a></li>
        </ul>
        <a href="#" data-activates="slide-out2" class="button-collapse show-on-large"><i class="material-icons">menu</i></a>
      </div>
      <div id="test3" class="col s12">
        <ul id="slide-out3" class="side-nav">
          <li><a href="#!">First Sidebar Link</a></li>
          <li><a href="#!">Second Sidebar Link</a></li>
        </ul>
        <a href="#" data-activates="slide-out3" class="button-collapse show-on-large"><i class="material-icons">menu</i></a>
      </div>
      <div id="test4" class="col s12">Test 4</div>
      <div id="test5" class="col s12">Test 5</div>
      <div id="test6" class="col s12">Test 6</div>
    </main>
  </div>
`);

export default view;
