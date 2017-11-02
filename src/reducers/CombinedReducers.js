/**
 * Created by sheng.wang on 2017/07/20.
 */
import surveySettingsReducer from "./SurveySettingReducers";
import {modifiedByReducer, modifiedWhenReducer} from "./HistoryReducers";
import {
    indexOfSelectedQuestionReducer, insertNewQuestionReducer, removeQuestionReducer,
    updateExistingQuestionsReducer
} from "./QuestionsReducer";
import answersReducer from "./AnswersReducer";
import {
    createSurveyReducer, searchResultReducer, searchValueReducer, startLoadingSurveyReducer, startSearchingReducer,
    surveyLoadedReducer
} from "./SurveyReducer";
import {
    actionTypeCreateSurvey, actionTypeStartSearchingSurveys, actionTypeSurveyLoaded
} from "../actions/SurveyActions";

import {category as categoryQuestionActions} from "../actions/QuestionActions";
import {
    actionTypeChangeQuestionProperty, actionTypeOptionTextChange,
    category as categoryQuestionConfigActions
} from "../actions/QuestionConfigActions";
import {category as categoryAnswerActions} from "../actions/AnswerActions";
import {List} from "../../node_modules/immutable/dist/immutable";
import {actionTypeRedo, actionTypeUndo} from "../actions/HistoryActions";
import {category as categoryMobilePreviewActions} from "../actions/MobilePreviewActions";
import {
    navigateQuestionReducer, mobilePreviewInProgressReducer,
    indexOfMobilePreviewQuestionReducer
} from "./MobilePreviewReducer";

const combinedReducers = (state = {
    searchValue: "",
    searchInProgress: false,
    loadSurveyInProgress: false,
    searchResults: null,
    survey: {
        previous: List(),
        present: null,
        future: List()
    }
}, action) => {
    return {
        searchValue: searchValueReducer(state.searchValue, action),
        searchInProgress: startSearchingReducer(state, action),
        searchResults: searchResultReducer(state, action),
        loadSurveyInProgress: startLoadingSurveyReducer(state, action),
        survey: surveyReducer(state, action)
    };
};

function surveyReducer(state, action) {
    if (action.type === actionTypeStartSearchingSurveys) return {present: null};
    if (action.type === actionTypeSurveyLoaded) return surveyLoadedReducer(state.survey, action);
    if (action.type === actionTypeCreateSurvey) return createSurveyReducer(state.searchValue, action);

    const presentSurvey = state.survey.present;
    if (presentSurvey === null) return state.survey;

    if (action.type === actionTypeUndo) return undoSurveyReducer(state);
    if (action.type === actionTypeRedo) return redoSurveyReducer(state);

    if (action.category !== categoryQuestionActions
        && action.category !== categoryQuestionConfigActions
        && action.category !== categoryAnswerActions
        && action.category !== categoryMobilePreviewActions) return state.survey;

    const surveySettings = surveySettingsReducer(presentSurvey.surveySettings, action);
    let indexOfSelectedQuestion = indexOfSelectedQuestionReducer(presentSurvey, action);
    let questions = updateExistingQuestionsReducer(presentSurvey.questions, action, indexOfSelectedQuestion);
    ({questions, indexOfSelectedQuestion} = insertNewQuestionReducer(questions, indexOfSelectedQuestion, action));
    ({questions, indexOfSelectedQuestion} = removeQuestionReducer(questions, indexOfSelectedQuestion, action));
    questions = answersReducer(questions, action);
    const mobilePreviewInProgress = mobilePreviewInProgressReducer(presentSurvey, action);
    const indexOfMobilePreviewQuestion = indexOfMobilePreviewQuestionReducer(presentSurvey, action);
    const modifiedBy = modifiedByReducer(presentSurvey.modifiedBy);
    const modifiedWhen = modifiedWhenReducer(presentSurvey.modifiedWhen);

    const modified = {
        id: presentSurvey.id,
        name: presentSurvey.name,
        surveySettings,
        indexOfSelectedQuestion,
        indexOfMobilePreviewQuestion,
        mobilePreviewInProgress,
        questions,
        modifiedWhen,
        modifiedBy,
        ui_relatedAction: action
    };

    if (action.category === categoryQuestionActions || action.category === categoryQuestionConfigActions) {
        //for these two above conditions we need to change the present survey and also modify the history

        const {previous, future} = state.survey;

        function mergeWithLastSurvey() {
            return {
                previous: previous.pop().push(presentSurvey),
                present: modified,
                future: future.clear()
            }
        }

        function directlyAddToPrevious() {
            return {
                previous: previous.push(presentSurvey),
                present: modified,
                future: future.clear()
            }
        }

        if (previous.isEmpty()) return directlyAddToPrevious();

        //merge text update...including question text, pre question text, post question text and option text...
        const lastInPrevious = previous.last();
        const lastAction = lastInPrevious.ui_relatedAction;

        if (lastAction) {
            //there is an edge case in which last action is missing: when the state is loaded for the first time.
            switch (lastAction.type) {
                case actionTypeOptionTextChange:
                    if (action.type === lastAction.type && action.optionId === lastAction.optionId)
                        return mergeWithLastSurvey();
                    break;
                case actionTypeChangeQuestionProperty:
                    if (action.type === lastAction.type
                        && action.questionId === lastAction.questionId
                        && action.propertyName === action.propertyName) {
                        if (action.propertyName === "preQuestionText"
                            || action.propertyName === "questionText"
                            || action.propertyName === "postQuestionTextOne"
                            || action.propertyName === "postQuestionTextTwo") {
                            return mergeWithLastSurvey()
                        }
                    }
                    break;
                default:
                //do nothing
            }
        }

        return directlyAddToPrevious();
    }

    //change the present but do not modify the history
    return {
        previous: state.survey.previous,
        present: modified,
        future: state.survey.future
    }
}

function redoSurveyReducer(state, action) {
    const {
        survey: {
            previous,
            present,
            future
        }
    } = state;

    if (present === null) return state.survey;
    if (future.isEmpty()) return state.survey;

    const last = future.last();
    return {
        previous: previous.push(present),
        present: last,
        future: future.pop()
    }
}

function undoSurveyReducer(state) {
    const {
        survey: {
            previous,
            present,
            future
        }
    } = state;

    //survey not loaded
    if (present === null) return state.survey;
    if (previous.isEmpty()) return state.survey;

    const last = previous.last();
    return {
        previous: previous.pop(),
        present: last,
        future: future.push(present)
    }
}

export default combinedReducers;