import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, IndexRoute, hashHistory,browserHistory,Link} from 'react-router';
import LLsk from '../Config/list.jsx';
import Player from '../Config/player.jsx';
import ListDetails from '../Config/listDetails.jsx';
import Download from '../Config/ganhuoxiazai.jsx';
import Guanzhu from '../Config/guanzhu.jsx';
import Zhuanti from '../Config/zhuanti.jsx';

const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;
const RouteConfig = (
    <Router history={hashHistory}>
        <Route path="/">
            <IndexRoute component={LLsk} />

            <Route path="/Download" component={Download} />
            <Route path="/Guanzhu" component={Guanzhu} />
            <Route path="/Zhuanti" component={Zhuanti} />
            <Route path="/ListDetails(/:id)" component={ListDetails} />
            <Route path="/Player(/:id)" component={Player} />
        </Route>
    </Router>
);

export default RouteConfig;