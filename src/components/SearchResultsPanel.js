/**
 * Created by sheng.wang on 2017/07/28.
 */

import "./styles/search-results.css"
import {PureComponent} from "react/lib/ReactBaseClasses";
import React from "react";

class Item extends PureComponent {

    render(){
        const {id, name, loadSurveyHandler} = this.props;
        return (
            <div className="result" onClick={evt => loadSurveyHandler(id)}>{name}</div>
        )
    }

}

class SearchResultsPanel extends PureComponent {

    render() {
        const {searchResults, searchInProgress, loadSurveyInProgress, noSurvey, loadSurveyHandler} = this.props;
        if(loadSurveyInProgress || searchInProgress || !noSurvey) return null;

        if(searchResults === null) return null;

        if(searchResults.isEmpty()) {
            return (
                <p className="bg-warning center-align std-padding">
                    Cannot find any results containing the keywords.
                </p>
            )
        }

        return (
            <div className="resultList">{searchResults.map(item => <Item  key={item.id} {...item} loadSurveyHandler={loadSurveyHandler}/>)}</div>
        )

    }

}

export default SearchResultsPanel;