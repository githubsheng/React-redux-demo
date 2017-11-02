/**
 * Created by sheng.wang on 2017/07/19.
 */

export const actionTypeAddOptionBefore = "add option before position";
export const actionTypeAddOptionAfter = "add option after position";
export const actionTypeAddOptionAtEnd = "add option at the end";
export const actionTypeRemoveOption = "remove option";
export const actionTypeChangeQuestionProperty = "change question property";
export const actionTypeOptionTextChange = "change option text";
export const category = "question config actions";

export function addOptionBefore(referenceOptionId, optionListName = "options") {
    return {
        category,
        type: actionTypeAddOptionBefore,
        referenceOptionId,
        optionListName
    }
}

export function addOptionAfter(referenceOptionId, optionListName = "options") {
    return {
        category,
        type: actionTypeAddOptionAfter,
        referenceOptionId,
        optionListName
    }
}

export function addOptionAtEnd(optionListName = "options") {
    return {
        category,
        type: actionTypeAddOptionAtEnd,
        optionListName
    }
}

export function removeOption(optionId, optionListName = "options") {
    return {
        category,
        type: actionTypeRemoveOption,
        optionId,
        optionListName
    }
}

export function changeQuestionProperty(propertyName, propertyValue, questionId) {
    return {
        category,
        type: actionTypeChangeQuestionProperty,
        questionId,
        propertyName,
        propertyValue
    }
}

export function changeOptionText(optionId, value, optionListName = "options") {
    return {
        category,
        type: actionTypeOptionTextChange,
        optionId,
        value,
        optionListName
    }
}
