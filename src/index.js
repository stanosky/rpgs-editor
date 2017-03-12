import {app} from 'hyperapp';
import subscriptions from './subs/subscriptions';
import hooks from './hooks/hooks';
import actions from './actions/actions';
import model from './models/model';
import view from './views/main';

app({model, view, actions, hooks, subscriptions });
