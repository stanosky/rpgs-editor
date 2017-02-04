import { app } from 'hyperapp';
import update from './updates/counter';
import model from './models/counter';
import view from './views/counter';

app({ root:document.getElementById('app-root'),model, update, view });
