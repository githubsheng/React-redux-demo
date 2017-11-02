/**
 * Created by sheng.wang on 2017/07/19.
 */

import * as optionAction from "../actions/QuestionConfigActions";
import {findIndexById, propertyChangeReducerCreator, uuidv4} from "../commons/Utily";
import {actionTypeChangeQuestionProperty} from "../actions/QuestionConfigActions";
import {actionTypeOptionTextChange} from "../actions/QuestionConfigActions";

/**
 * reducer to change top level question properties
 */
export const questionPropertyReducer = propertyChangeReducerCreator(actionTypeChangeQuestionProperty);

export function changeOptionTextReducer(options, action) {
    if(action.type === actionTypeOptionTextChange) {
        const index = findIndexById(options, action.optionId);
        const option = options.get(index);
        const changed = Object.assign({}, option, {text: action.value});
        return options.set(index, changed);
    }
    return options;
}

/**
 * state is an array of options
 * sample:
 * List([{id: string, text: string}, {id: string, text: string}])
 * List is from immutable
 */
export function addOptionReducer(options, action) {
    if(action.type !== optionAction.actionTypeAddOptionBefore
        && action.type !== optionAction.actionTypeAddOptionAfter
        && action.type !== optionAction.actionTypeAddOptionAtEnd) {
        return options;
    }

    let insertIndex = 0;
    let newOption = {id: uuidv4(), text: ""};

    switch (action.type){
        case optionAction.actionTypeAddOptionBefore:
            insertIndex = findIndexById(options, action.referenceOptionId);
            return options.splice(insertIndex, 0, newOption);
        case optionAction.actionTypeAddOptionAfter:
            insertIndex = findIndexById(options, action.referenceOptionId) + 1;
            return options.splice(insertIndex, 0, newOption);
        case optionAction.actionTypeAddOptionAtEnd:
            insertIndex = options.size;
            return options.splice(insertIndex, 0, newOption);
        default:
            return options;
    }
}

/**
 * state is the same described in addOption method
 */
export function removeOptionReducer(options, action) {
    if(action.type === optionAction.actionTypeRemoveOption) {
        const index = findIndexById(options, action.optionId)
        return options.splice(index, 1);
    }
    return options;
}

export function duplicateOptionValidationReducer(options) {
    const m = new Map();
    options.forEach(op => {
        if(m.has(op.text)) {
            const val = m.get(op.text) + 1;
            m.set(op.text, val);
        } else {
            m.set(op.text, 1);
        }
    });
    return options.map(op => {
        if (op.text === "") {
            return op;
        } else if (m.get(op.text) > 1 && !op.ui_hasError) {
            return Object.assign({}, op, {ui_hasError: true});
        } else if(m.get(op.text) === 1 && op.ui_hasError) {
            return Object.assign({}, op, {ui_hasError: false});
        }
        return op;
    });
}

export function removeUiErrorOfOptionsReducer(options) {
    return options.map(op => op.ui_hasError ? Object.assign({}, op, {ui_hasError: false}) : op);
}
