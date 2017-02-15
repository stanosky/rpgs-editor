import { app } from 'hyperapp';
import effects from './effects/effects';
import update from './updates/update';
import model from './models/model';
import view from './views/main';

app({ model, update, view, effects});
