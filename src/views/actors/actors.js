import { h } from 'hyperapp';

const view = (model, actions) => (
  <div
    id="ActorsTab"
    className={model.selectedTab === 'Actors' ? '' : 'is-hidden'}
  >
    <section class="hero is-info is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Not available yet :(
          </h1>
          <h2 class="subtitle">
            Expected after release of 1.2 version of RPGSW.
          </h2>
        </div>
      </div>
    </section>
  </div>);

export default view;
