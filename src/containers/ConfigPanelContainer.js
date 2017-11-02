/**
 * Created by sheng.wang on 2017/07/19.
 */

import ConfigPanel from "../components/ConfigPanel";
import connect from "react-redux/es/connect/connect";
import * as QuestionConfigActions from "../actions/QuestionConfigActions";
import {addQuestionAfter, addQuestionBefore, removeQuestion} from "../actions/QuestionActions";

function mapStateToProps(state) {
    return state.survey.present === null ? {noSurvey: true} : { selectedQuestion: state.survey.present.questions.get(state.survey.present.indexOfSelectedQuestion)};
}

function mapDispatchToProps(dispatch) {

    function addOptionAtEndHandler(optionListName) {
        dispatch(QuestionConfigActions.addOptionAtEnd(optionListName));
    }

    function addOptionBefore(referenceOptionId, optionListName){
        dispatch(QuestionConfigActions.addOptionBefore(referenceOptionId, optionListName));
    }

    function addOptionAfter(referenceOptionId, optionListName){
        dispatch(QuestionConfigActions.addOptionAfter(referenceOptionId, optionListName));
    }

    function removeOption(optionId, optionListName){
        dispatch(QuestionConfigActions.removeOption(optionId, optionListName));
    }

    function changeQuestionProperty(propertyName, propertyValue, questionId) {
        dispatch(QuestionConfigActions.changeQuestionProperty(propertyName, propertyValue, questionId));
    }

    function changeOptionText(optionId, value, optionListName) {
        dispatch(QuestionConfigActions.changeOptionText(optionId, value, optionListName));
    }

    function addQuestionAfterHandler(refId, questionType) {
        dispatch(addQuestionAfter(refId, questionType));
    }

    function addQuestionBeforeHandler(refId, questionType) {
        dispatch(addQuestionBefore(refId, questionType));
    }

    function removeQuestionHandler(){
        dispatch(removeQuestion());
    }

    return {
        addOptionAtEndHandler,
        addOptionBefore,
        addOptionAfter,
        removeOption,
        changeQuestionProperty,
        changeOptionText,
        addQuestionAfterHandler,
        addQuestionBeforeHandler,
        removeQuestionHandler
    }
}

const ConfigPanelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfigPanel);

export default ConfigPanelContainer;