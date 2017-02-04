import { html } from 'hyperapp';

const view = (model, msg) => (html`
  <div>
    <header>
      <nav class="top-nav">
        <div class="container">
          <div class="nav-wrapper"><a class="page-title">RPGS Editor</a></div>
        </div>
      </nav>
      <div class="container"><a href="#" data-activates="nav-mobile" class="button-collapse top-nav full hide-on-large-only"><i class="material-icons">menu</i></a></div>
      <ul id="nav-mobile" class="side-nav fixed" style="transform: translateX(0%);">
        <li class="bold"><a href="#" class="waves-effect waves-teal">About</a></li>
        <li class="bold"><a href="#" class="waves-effect waves-teal">Getting Started</a></li>
        <li class="bold"><a href="#" class="waves-effect waves-teal">Showcase</a></li>
      </ul>
    </header>
    <main>
      <div class="container">
        <div class="row">
          <div id="app-root" class="col s12">
            <a class="btn-floating btn-large waves-effect waves-light red" onclick=${msg.add}><i class="material-icons">add</i></a>
            <h1>${model.num}</h1>
            <a class="btn-floating btn-large waves-effect waves-light red" onclick=${msg.sub} disabled=${model.num <= 0}><i class="material-icons">remove</i></a>
          </div>
        </div>
      </div>
    </main>
  </div>
`);

export default view;
