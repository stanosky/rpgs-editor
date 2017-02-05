import { app } from 'hyperapp';
import update from './updates/editor';
import model from './models/editor';
import view from './views/mainView';
import subs from './subs/editor';

app({ root:document.getElementById('app-root'), model, update, view, subs });
