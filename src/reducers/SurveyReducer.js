/**
 * Created by sheng.wang on 2017/07/27.
 */

import {
    actionTypeCreateSurvey, actionTypeLoadSurveyInProgress, actionTypeShowSearchResult, actionTypeStartSearchingSurveys,
    actionTypeSurveyLoaded,
    actionTypeUpdateSearchValue,
    actionTypeStartMobilePreview, actionTypeStopMobilePreview
} from "../actions/SurveyActions";
import {List} from "../../node_modules/immutable/dist/immutable";
import {uuidv4} from "../commons/Utily";

export function searchValueReducer(searchValue, action) {
    return action.type === actionTypeUpdateSearchValue ? action.value : searchValue;
}

export function createSurveyReducer(searchName, action) {
    if (action.type === actionTypeCreateSurvey) {
        return createSurvey(searchName);
    }
    return null;
}

export function startSearchingReducer(state, action) {
    if (action.type === actionTypeStartSearchingSurveys) {
        return true;
    } else if (action.type === actionTypeShowSearchResult) {
        return false;
    }
    return state.searchInProgress;
}

export function searchResultReducer(state, action) {
    if (action.type === actionTypeShowSearchResult) {
        return List([...action.searchResult]);
    }
    return state.searchResults;
}

export function startLoadingSurveyReducer(state, action) {
    if (action.type === actionTypeLoadSurveyInProgress) {
        return true;
    } else if (action.type === actionTypeSurveyLoaded) {
        return false;
    }
    return state.loadSurveyInProgress;
}

function resetSurveyAttributes(survey) {
    const resettedAttribtues = {
        indexOfSelectedQuestion: null,
        indexOfMobilePreviewQuestion: -1,
        mobilePreviewInProgress: false
    };
    return Object.assign({}, survey, resettedAttribtues);
}

export function surveyLoadedReducer(state, action) {
    if (action.type === actionTypeSurveyLoaded) {
        const survey = resetSurveyAttributes(action.survey);
        return {
            previous: List(),
            present: survey,
            future: List()
        }
    }
    return state.survey;
}

function createSurvey(searchName) {
    return {
        previous: List(),
        present: {
            id: uuidv4(),
            name: searchName,
            surveySettings: {},
            questions: List(),
            indexOfSelectedQuestion: null,
            indexOfMobilePreviewQuestion: -1,
            mobilePreviewInProgress: false,
            modifiedBy: "somebody",
            modifiedWhen: Date.now().toString()
        },
        future: List()
    };
}