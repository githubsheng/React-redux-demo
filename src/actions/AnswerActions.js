/**
 * Created by sheng.wang on 2017/07/26.
 */
export const actionTypeChooseItemInRankingQuestion = "choose item in ranking question";
export const category = "preview answer actions";

export function chooseOptionInRankingQuestion(questionId, candidateId){
    return {
        category,
        type: actionTypeChooseItemInRankingQuestion,
        questionId,
        candidateId
    }
}