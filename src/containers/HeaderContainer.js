/**
 * Created by sheng.wang on 2017/07/27.
 */

import connect from "react-redux/es/connect/connect";
import Header from "../components/Header";
import {
    createSurveyActionCreator, searchSurveyActionCreator,
    updateSearchValueActionCreator
} from "../actions/SurveyActions";
import {redoActionCreator, undoActionCreator} from "../actions/HistoryActions";
import {toggleMobilePreviewActionCreator} from "../actions/MobilePreviewActions";

function mapStateToProps(state) {
    return {
        searchValue: state.searchValue,
        searchInProgress: state.searchInProgress,
        loadSurveyInProgress: state.loadSurveyInProgress,
        noSurvey: !state.survey.present
    }
}

function mapDispatchToProps(dispatch) {

    function searchSurvey(name) {
        dispatch(searchSurveyActionCreator(name));
    }

    function createSurvey() {
        dispatch(createSurveyActionCreator());
    }

    function updateSearchValue(value) {
        dispatch(updateSearchValueActionCreator(value))
    }

    function redo() {
        dispatch(redoActionCreator())
    }

    function undo(){
        dispatch(undoActionCreator())
    }

    function toggleMobilePreview(){
        dispatch(toggleMobilePreviewActionCreator())
    }

    return {
        searchSurvey,
        createSurvey,
        updateSearchValue,
        redo,
        undo,
        toggleMobilePreview
    }
}

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

export default HeaderContainer;