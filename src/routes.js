import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Pokedex from './pages/pokedex';


//Criar o componentes com as rotas
function Routes(){
    return(
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route path="/" exact component={Pokedex} />
            </Switch>        
        </BrowserRouter>
    );
};

export default Routes;