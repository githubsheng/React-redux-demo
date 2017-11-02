/**
 * Created by sheng.wang on 2017/07/25.
 */

import {
    addOptionReducer, changeOptionTextReducer, duplicateOptionValidationReducer, questionPropertyReducer,
    removeOptionReducer, removeUiErrorOfOptionsReducer
} from "./QuestionConfigReducers";
export default function matrixConfigReducer(question, action) {
    if(question === null) return null;
    let changedProperty = questionPropertyReducer(question, action);
    let changedOptions = optionReducer(question, action);

    //validate the options
    let columns = changedOptions.columns ? changedOptions.columns : question.columns;

    if(changedProperty.canSelectSameOption) {
        //property is changed, use the new property
        if(changedProperty.canSelectSameOption === "cannot") {
            columns = duplicateOptionValidationReducer(columns);
        } else {
            columns = removeUiErrorOfOptionsReducer(columns);
        }
    } else {
        //property is not changed, use the old property
        if(question.canSelectSameOption === "cannot") {
            columns = duplicateOptionValidationReducer(columns);
        } else {
            columns = removeUiErrorOfOptionsReducer(columns);
        }
    }

    changedOptions.columns = columns;
    return Object.assign({}, question, changedOptions, changedProperty);
}

function optionReducer(question, action) {
    if(action.optionListName === "row") {
        let rows = addOptionReducer(question.rows, action);
        rows = removeOptionReducer(rows, action);
        rows = changeOptionTextReducer(rows, action);
        return {rows};
    }

    if(action.optionListName === "column") {
        let columns = addOptionReducer(question.columns, action);
        columns = removeOptionReducer(columns, action);
        columns = changeOptionTextReducer(columns, action);
        return {columns};
    }

    return {};
}