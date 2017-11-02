/**
 * Created by sheng.wang on 2017/07/14.
 */

import './styles/main-layout.css';
import './styles/commons.css';
import React from 'react';
import ChoicePreview from "./ChoicePreview";
import RankingPreview from "./RankPreview";
import * as QuestionEnums from "../commons/QuestionEnums";
import SelectQuestionTypeSplitButton from "./SelectQuestionTypeSplitButton";
import TextInputReview from "./TextInputReview";
import MatrixPreview from "./MatrixPreview";
import {PureComponent} from "react/lib/ReactBaseClasses";

class PreviewPanel extends PureComponent {

    render() {
        const {
            noSurvey, questions, indexOfSelectedQuestion, selectQuestionHandler, appendQuestionHandler,
            chooseOptionInRankingQuestionHandler, mobilePreviewInProgress
        } = this.props;

        if (noSurvey) {
            return (
                <div className="preview-container"/>
            )
        }

        if(mobilePreviewInProgress) return null;

        const previews = questions.map((question, index) => {

            const commonProps = {
                key: question.id,
                question,
                order: index + 1,
                selectQuestionHandler,
                isSelected: indexOfSelectedQuestion === index,
            };

            switch (question.type) {
                case QuestionEnums.questionTypeSingleChoice:
                    return <ChoicePreview {...commonProps}/>;
                case QuestionEnums.questionTypeMultipleChoice:
                    return <ChoicePreview isMultiple {...commonProps}/>;
                case QuestionEnums.questionTypeRanking:
                    return <RankingPreview {...commonProps}
                                           chooseOptionInRankingQuestionHandler={chooseOptionInRankingQuestionHandler}/>;
                case QuestionEnums.questionTypeTextInput:
                    return <TextInputReview {...commonProps}/>;
                case QuestionEnums.questionTypeSingleChoiceMatrix:
                    return <MatrixPreview {...commonProps}/>;
                case QuestionEnums.questionTypeMultipleChoiceMatrix:
                    return <MatrixPreview isMultiple {...commonProps}/>;
                default:
                    return null;
            }
        });

        return (
            <div className="preview-container">
                <div className="question-list">
                    {previews}
                </div>
                <div className="append-new-question">
                    <SelectQuestionTypeSplitButton handler={appendQuestionHandler} title="質問追加"/>
                </div>
            </div>
        );

    }

}


export default PreviewPanel;

