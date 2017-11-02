/**
 * Created by sheng.wang on 2017/07/25.
 */

import {
    addOptionReducer, changeOptionTextReducer, questionPropertyReducer,
    removeOptionReducer
} from "./QuestionConfigReducers";
export default function textInputConfigReducer(question, action) {
    if(question === null) return null;
    let changedProperty = questionPropertyReducer(question, action);
    let changedOptions = optionReducer(question, action);
    return Object.assign({}, question, changedOptions, changedProperty);
}

function optionReducer(question, action) {
    let inputBoxes = addOptionReducer(question.inputBoxes, action);
    inputBoxes = removeOptionReducer(inputBoxes, action);
    inputBoxes = changeOptionTextReducer(inputBoxes, action);
    return {inputBoxes};
}