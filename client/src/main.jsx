import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import './styles/styles.css';
import createModel from './model/createModel';

import ColorSchemeGenerator from './ColorSchemeGenerator';
// ['#2a282b'], '#82c3c7', '#ebce7d', '#ff4c2d', '#c61800'
const model = createModel();
ReactDOM.render(<ColorSchemeGenerator model={model} />, document.getElementById('mount'));
