/**
 * Created by sheng.wang on 2017/07/25.
 */

import {
    addOptionReducer, changeOptionTextReducer, questionPropertyReducer,
    removeOptionReducer
} from "./QuestionConfigReducers";

import {
    actionTypeAddOptionAfter, actionTypeAddOptionAtEnd, actionTypeAddOptionBefore, actionTypeOptionTextChange,
    actionTypeRemoveOption
} from "../actions/QuestionConfigActions";
import {findIndexById} from "../commons/Utily";
import {List} from "../../node_modules/immutable/dist/immutable";

export default function rankingConfigReducer(question, action) {
    if(question === null) return null;
    let changedProperty = questionPropertyReducer(question, action);
    let changedOptions = optionReducer(question, action);
    let changedNumberOfRanks = adjustNumberOfRanksBasedOnCandidateSizes(question.numberOfRanks, changedOptions.candidates.size, action);
    const changedAnswers = adjustAnswers(changedOptions.candidates, question.answers, action);
    return Object.assign({}, question, changedOptions, changedProperty, changedNumberOfRanks, changedAnswers);
}

function optionReducer(question, action) {
    let candidates = addOptionReducer(question.candidates, action);
    candidates = removeOptionReducer(candidates, action);
    candidates = changeOptionTextReducer(candidates, action);
    return {candidates};
}

function adjustNumberOfRanksBasedOnCandidateSizes(numberOfRanks, optionListSize, action){
    if(action.type === actionTypeRemoveOption && numberOfRanks > optionListSize) {
        return {numberOfRanks: optionListSize};
    }
    return {};
}

function adjustAnswers(candidates, answers, action) {

    if(answers === undefined) {
        //initiate answers
        return {
            answers: List(candidates)
        }
    }

    if(action.type === actionTypeAddOptionBefore
        || action.type === actionTypeAddOptionAfter
        || action.type === actionTypeAddOptionAtEnd) {

       const newCandidate = candidates.find(c => {
           return findIndexById(answers, c.id) === -1;
       });

       return {
           answers: answers.push(newCandidate)
       }
    }

    if(action.type === actionTypeRemoveOption) {
        const tmp = answers.filter(a => findIndexById(candidates, a.id) !== -1);
        return {answers: tmp}
    }

    if(action.type === actionTypeOptionTextChange) {
        const index = findIndexById(answers, action.optionId);
        const p = answers.get(index);
        const np = Object.assign({}, p, {text: action.value});
        return {answers: answers.set(index, np)}
    }

    return {};
}