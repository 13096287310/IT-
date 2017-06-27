import React from 'react';
import ReactDOM, {render} from 'react-dom';
import PropTypes from 'prop-types';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import RouteConfig from './Router/index.jsx';


import './Component/Config.js';//引入默认配置
import './Style/index.less';


render(RouteConfig, document.getElementById('nimei'));









