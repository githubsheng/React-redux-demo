/**
 * Created by sheng.wang on 2017/07/23.
 */
export const actionTypeAddQuestionBefore = "add question before position";
export const actionTypeAddQuestionAfter = "add question after position";
export const actionTypeAddQuestionAtEnd = "add question at the end";
export const actionTypeRemoveQuestion = "remove question";
export const actionTypeSelectQuestion = "select a question";
export const category = "insert / remove / select question actions";

export function addQuestionBefore(referenceQuestionId, questionType){
    return {
        type: actionTypeAddQuestionBefore,
        referenceQuestionId,
        questionType,
        category
    }
}

export function addQuestionAfter(referenceQuestionId, questionType) {
    return {
        type: actionTypeAddQuestionAfter,
        referenceQuestionId,
        questionType,
        category
    }
}

export function addQuestionAtEnd(questionType) {
    return {
        type: actionTypeAddQuestionAtEnd,
        questionType,
        category
    }
}

export function removeQuestion() {
    return {
        type: actionTypeRemoveQuestion,
        category
    }
}

export function selectQuestion(questionId) {
    return {
        type: actionTypeSelectQuestion,
        questionId,
        category
    }
}