/**
 * Created by sheng.wang on 2017/07/26.
 */

import {findIndexById} from "../commons/Utily";
import {actionTypeChooseItemInRankingQuestion, category as answersCategory} from "../actions/AnswerActions";
import {questionTypeRanking} from "../commons/QuestionEnums";
import {merge} from 'lodash';

function answersReducer(questions, action){
    if(action.category !== answersCategory) return questions;
    const index = findIndexById(questions, action.questionId);
    const question = questions.get(index);
    let modified = null;
    switch(question.type) {
        case questionTypeRanking:
            modified = rankingQuestionReducer(question, action);
            break;
        default:
            //do nothing
    }
    return questions.set(index, modified);
}

function rankingQuestionReducer(question, action) {
    if(action.type !== actionTypeChooseItemInRankingQuestion) return question;

    if(question.temp === undefined) return merge({}, question, {temp: {chosenCandidateId: action.candidateId}});
    //now that we know chosen candidate id is set previously.

    //there is a chance that we previously set an candidate as the chosen candidate but then it is removed from the answer list.
    const preIdx = findIndexById(question.answers, question.temp.chosenCandidateId);
    if(preIdx === -1) return merge({}, question, {temp: {chosenCandidateId: action.candidateId}})

    //swap positions.
    const preOpt = question.answers.get(preIdx);
    const idx = findIndexById(question.answers, action.candidateId);
    const opt = question.answers.get(idx);
    const swapped = question.answers.set(preIdx, opt).set(idx, preOpt);
    return merge({}, question, {answers: swapped, temp: {chosenCandidateId: null}});
}

export default answersReducer;