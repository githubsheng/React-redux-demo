/**
 * Created by sheng.wang on 2017/08/21.
 */


import {
    actionTypeNextQuestion, actionTypePrevQuestion, actionTypeToggleMobilePreview
} from "../actions/MobilePreviewActions";
export function mobilePreviewInProgressReducer(survey, action){
    if(action.type === actionTypeToggleMobilePreview) return !survey.mobilePreviewInProgress;
    return survey.mobilePreviewInProgress;
}

export function indexOfMobilePreviewQuestionReducer(survey, action) {
    const indexOfWelcomePage = -1;
    if(action.type === actionTypeToggleMobilePreview) return indexOfWelcomePage;
    //when the index === survey.questions.size, we render the page that says survey has ended.
    if(action.type === actionTypeNextQuestion) return Math.min(survey.indexOfMobilePreviewQuestion + 1, survey.questions.size);
    //when the index === -1, we render the page that says the survey will now start.
    if(action.type === actionTypePrevQuestion) return Math.max(survey.indexOfMobilePreviewQuestion - 1, -1);
    return survey.indexOfMobilePreviewQuestion;
}