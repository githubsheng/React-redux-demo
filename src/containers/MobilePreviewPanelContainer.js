import {nextQuestion, prevQuestion} from "../actions/MobilePreviewActions";
import connect from "react-redux/es/connect/connect";
import MobilePreviewPanel from "../components/MobilePreviewPanel";
import {chooseOptionInRankingQuestion} from "../actions/AnswerActions";

function mapStateToProps(state) {
    return state.survey.present === null ?
    {noSurvey: true} :
    {
        questions: state.survey.present.questions,
        mobilePreviewInProgress: state.survey.present.mobilePreviewInProgress,
        indexOfMobilePreviewQuestion: state.survey.present.indexOfMobilePreviewQuestion
    };
}

function mapDispatchToProps(dispatch) {

    function nextQuestionHandler(questionId) {
        dispatch(nextQuestion(questionId));
    }

    function prevQuestionHandler(questionType){
        dispatch(prevQuestion(questionType));
    }

    function chooseOptionInRankingQuestionHandler(questionId, candidateId) {
        dispatch(chooseOptionInRankingQuestion(questionId, candidateId))
    }

    return {
        nextQuestionHandler,
        prevQuestionHandler,
        chooseOptionInRankingQuestionHandler
    }
}

const MobilePreviewPanelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MobilePreviewPanel);

export default MobilePreviewPanelContainer;
