/**
 * Created by sheng.wang on 2017/07/20.
 */

import singleChoiceConfigReducer from "./SingleChoiceConfigReducer";
import multipleChoiceConfigReducer from "./MultipleChoiceConfigReducer";
import matrixConfigReducer from "./MatrixConfigReducer";
import textInputConfigReducer from "./TextInputConfigReducer";
import rankingConfigReducer from "./RankingConfigReducer";
import * as QuestionEnums from "../commons/QuestionEnums";
import {List} from "../../node_modules/immutable/dist/immutable";
import {
    actionTypeAddQuestionAfter, actionTypeAddQuestionAtEnd,
    actionTypeAddQuestionBefore, actionTypeRemoveQuestion, actionTypeSelectQuestion,
} from "../actions/QuestionActions";

import {
    category as questionConfigCategory
} from "../actions/QuestionConfigActions";

import {findIndexById, uuidv4} from "../commons/Utily";

//todo: should call different types of reducers based on question type. say, if its single choice u call single choice reducer
export function updateExistingQuestionsReducer(questions = List(), action, indexOfSelectedQuestion = null) {
    if (action.category !== questionConfigCategory) return questions;

    if (questions.length === 0) return questions;
    const selectedQuestion = questions.get(indexOfSelectedQuestion);
    let updatedQuestion;
    switch (selectedQuestion.type) {
        case QuestionEnums.questionTypeSingleChoice:
            updatedQuestion = singleChoiceConfigReducer(selectedQuestion, action);
            break;
        case QuestionEnums.questionTypeMultipleChoice:
            updatedQuestion = multipleChoiceConfigReducer(selectedQuestion, action);
            break;
        case QuestionEnums.questionTypeSingleChoiceMatrix:
        case QuestionEnums.questionTypeMultipleChoiceMatrix:
            updatedQuestion = matrixConfigReducer(selectedQuestion, action);
            break;
        case QuestionEnums.questionTypeTextInput:
            updatedQuestion = textInputConfigReducer(selectedQuestion, action);
            break;
        case QuestionEnums.questionTypeRanking:
            updatedQuestion = rankingConfigReducer(selectedQuestion, action);
            break;
        default:
            throw new Error("cannot find relevant question type");
    }

    return questions.set(indexOfSelectedQuestion, updatedQuestion);
}

export function indexOfSelectedQuestionReducer(survey, action) {
    if (action.type === actionTypeSelectQuestion) return findIndexById(survey.questions, action.questionId)
    return survey.indexOfSelectedQuestion;
}

export function insertNewQuestionReducer(questions, indexOfSelectedQuestion, action) {

    if (action.type !== actionTypeAddQuestionAtEnd
        && action.type !== actionTypeAddQuestionAfter
        && action.type !== actionTypeAddQuestionBefore)
        return {questions, indexOfSelectedQuestion};

    const {questionType, referenceQuestionId} = action;
    let indexOfNewQuestion;
    switch (action.type) {
        case actionTypeAddQuestionBefore:
            indexOfNewQuestion = findIndexById(questions, referenceQuestionId);
            break;
        case actionTypeAddQuestionAfter:
            indexOfNewQuestion = findIndexById(questions, referenceQuestionId) + 1;
            break;
        default:
        //do nothing.
    }

    let newQuestion;
    switch (questionType) {
        case QuestionEnums.questionTypeSingleChoice:
            newQuestion = createSingleChoiceQuestion();
            break;
        case QuestionEnums.questionTypeMultipleChoice:
            newQuestion = createMultipleChoiceQuestion();
            break;
        case QuestionEnums.questionTypeRanking:
            newQuestion = createRanking();
            break;
        case QuestionEnums.questionTypeSingleChoiceMatrix:
            newQuestion = createSingleChoiceMatrix();
            break;
        case QuestionEnums.questionTypeMultipleChoiceMatrix:
            newQuestion = createMultipleChoiceMatrix();
            break;
        case QuestionEnums.questionTypeTextInput:
            newQuestion = createTextInput();
            break;
        default:
            //do nothing
    }

    if (action.type === actionTypeAddQuestionAtEnd) {
        const newQuestions = questions.push(newQuestion);
        const newIndexOfSelectedQuestion = newQuestions.size - 1;
        return {
            questions: newQuestions,
            indexOfSelectedQuestion: newIndexOfSelectedQuestion
        }
    } else {
        return {
            questions: questions.insert(indexOfNewQuestion, newQuestion),
            indexOfSelectedQuestion: indexOfNewQuestion
        }
    }
}

export function removeQuestionReducer(questions, indexOfSelectedQuestion, action) {
    if (action.type === actionTypeRemoveQuestion) {
        return {questions: questions.remove(indexOfSelectedQuestion), indexOfSelectedQuestion: null};
    }
    return {questions, indexOfSelectedQuestion}
}

function createOption() {
    return {
        id: uuidv4(),
        text: ""
    }
}

function createTwoOptions() {
    return List([createOption(), createOption()]);
}

const commonPropsForChoiceQuestion = () => {
    return {
        id: uuidv4(),
        preQuestionText: "",
        questionText: "",
        postQuestionTextOne: "",
        postQuestionTextTwo: "",
        isAnswerRequired: "required",
        whiteSpaceWrapOnMobile: "invalid",
        canSelectSameOption: "cannot",
        options: createTwoOptions()
    }
};

function createSingleChoiceQuestion() {
    return Object.assign({}, commonPropsForChoiceQuestion(), {type: QuestionEnums.questionTypeSingleChoice})
}

function createMultipleChoiceQuestion() {
    return Object.assign({}, commonPropsForChoiceQuestion(), {type: QuestionEnums.questionTypeMultipleChoice})
}

const commonPropsForNewMatrix = () => {
    return {
        id: uuidv4(),
        preQuestionText: "",
        questionText: "",
        postQuestionTextOne: "",
        postQuestionTextTwo: "",
        isAnswerRequired: "required",
        whiteSpaceWrapOnMobile: "invalid",
        canSelectSameOption: "cannot",
        rows: createTwoOptions(),
        columns: createTwoOptions()
    }
};

function createSingleChoiceMatrix() {
    return Object.assign({}, commonPropsForNewMatrix(), {type: QuestionEnums.questionTypeSingleChoiceMatrix})
}

function createMultipleChoiceMatrix() {
    return Object.assign({}, commonPropsForNewMatrix(), {type: QuestionEnums.questionTypeMultipleChoiceMatrix})
}

function createTextInput() {
    return {
        type: QuestionEnums.questionTypeTextInput,
        id: uuidv4(),
        preQuestionText: "",
        questionText: "",
        postQuestionTextOne: "",
        postQuestionTextTwo: "",
        isAnswerRequired: "required",
        whiteSpaceWrapOnMobile: "invalid",
        inputBoxes: List([createOption()])
    };
}

function createRanking() {
    return {
        type: QuestionEnums.questionTypeRanking,
        id: uuidv4(),
        preQuestionText: "",
        questionText: "",
        postQuestionTextOne: "",
        postQuestionTextTwo: "",
        isAnswerRequired: "required",
        whiteSpaceWrapOnMobile: "invalid",
        numberOfRanks: 2,
        candidates: List([createOption(), createOption(), createOption()])
    };
}

