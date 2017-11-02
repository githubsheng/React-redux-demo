/**
 * Created by sheng.wang on 2017/07/19.
 */

import {List} from "../node_modules/immutable/dist/immutable";
const questionList = [
    {
        type: "ranking",
        id: "uudeID",
        preQuestionText: "",
        questionText: "",
        postQuestionTextOne: "",
        postQuestionTextTwo: "",
        isAnswerRequired: "required",
        whiteSpaceWrapOnMobile: "invalid",
        numberOfRanks: 4,
        candidates: List([
            {
                id: "YUImx",
                text: ""
            },
            {
                id: "UmeiLLLzz",
                text: ""
            },
            {
                id: "aYUImx",
                text: ""
            },
            {
                id: "aUmeiLLLzz",
                text: ""
            }
        ])
    },
    {
        id: "aeUIENjs",
        type: "singleChoice",
        preQuestionText: "",
        questionText: "",
        postQuestionTextOne: "",
        postQuestionTextTwo: "",
        isAnswerRequired: "required",
        whiteSpaceWrapOnMobile: "invalid",
        canSelectSameOption: "cannot",
        options: List([
            {
                id: "MIleIeXX",
                text: ""
            },
            {
                id: "UmeiLLL",
                text: ""
            }
        ])
    },
    {
        id: "Ukskemi",
        type: "singleChoiceMatrix",
        preQuestionText: "",
        questionText: "",
        postQuestionTextOne: "",
        postQuestionTextTwo: "",
        isAnswerRequired: "required",
        whiteSpaceWrapOnMobile: "invalid",
        canSelectSameOption: "cannot",
        rows: List([
            {
                id: "XmeislEILESs",
                text: ""
            },
            {
                id: "MIleIeLLLSES",
                text: ""
            }
        ]),
        columns: List([
            {
                id: "XmeislEILESs",
                text: ""
            },
            {
                id: "MIleIeLLLSES",
                text: ""
            }
        ])
    },
    {
        id: "XyneU",
        type: "textInput",
        preQuestionText: "",
        questionText: "",
        postQuestionTextOne: "",
        postQuestionTextTwo: "",
        isAnswerRequired: "required",
        whiteSpaceWrapOnMobile: "invalid",
        inputBoxes: List([
            {
                id: "MIleIeLLLSES",
                text: ""
            }
        ])
    }
];

const sampleData = {
    searchValue: "",
    searchInProgress: false,
    loadSurveyInProgress: false,
    searchResults: List(),
    survey: {
        previous: List(),
        present: {
            surveyName: "my survey",
            surveySettings: {},
            questions: List(questionList),
            indexOfSelectedQuestion: null,
            mobilePreviewInProgress: false,
            indexOfMobilePreviewQuestion: 0,
            modifiedBy: "somebody",
            modifiedWhen: 12345667778
        },
        future: List()
    }
};

export default sampleData;