import { app } from 'hyperapp';
import hooks from './hooks/hooks';
import effects from './effects/effects';
import update from './updates/update';
import model from './models/model';
import view from './views/main';

app({ model, update, view, effects, hooks});
