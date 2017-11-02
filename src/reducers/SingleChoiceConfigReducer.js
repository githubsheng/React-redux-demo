/**
 * Created by sheng.wang on 2017/07/21.
 */

import {
    addOptionReducer, changeOptionTextReducer, duplicateOptionValidationReducer, questionPropertyReducer,
    removeOptionReducer, removeUiErrorOfOptionsReducer
} from "./QuestionConfigReducers";

export default function singleChoiceConfigReducer(question = null, action) {
    if(question === null) return null;
    let changedProperty = questionPropertyReducer(question, action);
    let options = addOptionReducer(question.options, action);
    options = removeOptionReducer(options, action);
    options = changeOptionTextReducer(options, action);
    //validate the options
    if(changedProperty.canSelectSameOption) {
        //property is changed, use the new property
        if(changedProperty.canSelectSameOption === "cannot") {
            options = duplicateOptionValidationReducer(options);
        } else {
            options = removeUiErrorOfOptionsReducer(options);
        }
    } else {
        //property is not changed, use the old property
        if(question.canSelectSameOption === "cannot") {
            options = duplicateOptionValidationReducer(options);
        } else {
            options = removeUiErrorOfOptionsReducer(options);
        }
    }
    return Object.assign({}, question, {options}, changedProperty);
}