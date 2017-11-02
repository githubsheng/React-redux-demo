import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Provider from "react-redux/es/components/Provider";
import combinedReducers from "./reducers/CombinedReducers";
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {backendDomain} from './settings';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combinedReducers,
    // null,
    composeEnhancers(
        applyMiddleware(
            thunkMiddleware
        )
    )
);

{
    let survey;
    setInterval(() => {
        const newSurvey = store.getState().survey.present;
        if(newSurvey === null || newSurvey === undefined) return;
        if(survey !== newSurvey) {
            survey = newSurvey;
            fetch(`${backendDomain}survey/save/${survey.id}/${survey.name}`, {
                method: "POST",
                body: JSON.stringify(survey)
            })
        }
    }, 500);
}


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

//wont work in http environment on chrome.
// registerServiceWorker();
