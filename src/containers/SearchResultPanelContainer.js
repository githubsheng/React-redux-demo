/**
 * Created by sheng.wang on 2017/07/28.
 */

import SearchResultsPanel from "../components/SearchResultsPanel";
import {loadSurveyActionCreator} from "../actions/SurveyActions";
import connect from "react-redux/es/connect/connect";
function mapStateToProps(state) {
    return {
        searchResults: state.searchResults,
        searchInProgress: state.searchInProgress,
        loadSurveyInProgress: state.loadSurveyInProgress,
        noSurvey: state.survey.present === null
    }
}

function mapDispatchToProps(dispatch) {

    function loadSurveyHandler(id) {
        dispatch(loadSurveyActionCreator(id));
    }

    return {
        loadSurveyHandler
    }
}

const SearchResultPanelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResultsPanel);

export default SearchResultPanelContainer;
