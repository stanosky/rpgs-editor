'use strict';

import { h } from 'hyperapp';
import navLeft from './navLeft';

const view = (model, msg) => (
  <div className="block">
    <nav className="nav has-shadow">
      <div className="container">
        {navLeft(model, msg)}
      </div>
    </nav>
    <section>
      
    </section>
  </div>
);

export default view;
