/**
 * Created by sheng.wang on 2017/07/27.
 */
import {List} from "../../node_modules/immutable/dist/immutable";
import {backendDomain} from "../settings";

export const actionTypeCreateSurvey = "create survey";
export const actionTypeUpdateSearchValue = "update search value";
export const actionTypeStartSearchingSurveys = "start searching surveys";
export const actionTypeShowSearchResult = "show search result";
export const actionTypeLoadSurveyInProgress = "load survey in progress";
export const actionTypeSurveyLoaded = "survey loaded";
export const category = "create / search / mobile preview: survey actions";


export function createSurveyActionCreator(name) {
    return {
        category,
        type: actionTypeCreateSurvey
    }
}

export function searchSurveyActionCreator(name) {

    return function (dispatch) {

        dispatch(startSearchingSurveysActionCreator());

        return fetch(`${backendDomain}survey/search/${name}`)
            .then(response => response.json())
            .then(searchResults => {
                dispatch(showSearchResultActionCreator(searchResults));
            });

    };
}

function convertArraysToList(obj) {
    if (Array.isArray(obj)) {
        //if it is an array.
        const converted = obj.map(elem => convertArraysToList(elem));
        return List(converted);
    } else if ((typeof obj === "object") && obj !== null) {
        //if it is other type of objects
        const temp = {};
        Object.keys(obj).forEach(key => {
            temp[key] = convertArraysToList(obj[key]);
        });
        return temp;
    } else {
        //if it is string, number, boolean and so on
        return obj;
    }
}

export function loadSurveyActionCreator(id) {

    return function (dispatch) {

        dispatch(loadSurveyInProgressActionCreator());

        return fetch(`${backendDomain}survey/get/${id}`)
            .then(response => response.json())
            .then(loadedSurvey => {
                const s = convertArraysToList(loadedSurvey);
                dispatch(surveyLoadedActionCreator(s));
            });

    }

}

export function loadSurveyInProgressActionCreator() {
    return {
        type: actionTypeLoadSurveyInProgress,
        category
    }
}

export function surveyLoadedActionCreator(survey) {
    return {
        type: actionTypeSurveyLoaded,
        survey,
        category
    }
}

export function startSearchingSurveysActionCreator() {
    return {
        type: actionTypeStartSearchingSurveys,
        category
    }
}

export function showSearchResultActionCreator(searchResult) {
    return {
        type: actionTypeShowSearchResult,
        searchResult,
        category
    }
}

export function updateSearchValueActionCreator(value) {
    return {
        category,
        value,
        type: actionTypeUpdateSearchValue
    }
}