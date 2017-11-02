/**
 * Created by sheng.wang on 2017/07/21.
 */

import PreviewPanel from "../components/PreviewPanel";
import connect from "react-redux/es/connect/connect";
import {addQuestionAtEnd, selectQuestion} from "../actions/QuestionActions";
import {chooseOptionInRankingQuestion} from "../actions/AnswerActions";

function mapStateToProps(state) {
    return state.survey.present === null ?
        {noSurvey: true} :
        {
            questions: state.survey.present.questions,
            indexOfSelectedQuestion: state.survey.present.indexOfSelectedQuestion,
            mobilePreviewInProgress: state.survey.present.mobilePreviewInProgress
        };
}

function mapDispatchToProps(dispatch) {

    function selectQuestionHandler(questionId) {
        dispatch(selectQuestion(questionId));
    }

    function appendQuestionHandler(questionType) {
        dispatch(addQuestionAtEnd(questionType));
    }

    function chooseOptionInRankingQuestionHandler(questionId, candidateId) {
        dispatch(chooseOptionInRankingQuestion(questionId, candidateId))
    }

    return {
        selectQuestionHandler,
        appendQuestionHandler,
        chooseOptionInRankingQuestionHandler
    }
}

const PreviewPanelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PreviewPanel);

export default PreviewPanelContainer;