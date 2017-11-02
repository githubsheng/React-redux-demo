import {PureComponent} from "react/lib/ReactBaseClasses";
import React from "react";
import "./styles/mobile-preview.css";
import * as QuestionEnums from "../commons/QuestionEnums";
import ChoicePreview from "./ChoicePreview";
import TextInputReview from "./TextInputReview";
import MatrixPreview from "./MatrixPreview";
import RankingPreview from "./RankPreview";
import Button from "react-bootstrap/es/Button";
import {IPhoneSimulator} from "./IPhoneSimulator";

class MobilePreviewPanel extends PureComponent {

    getPreview(commonProps, chooseOptionInRankingQuestionHandler) {
        switch (commonProps.question.type) {
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

    }

    render() {
        const {
            noSurvey,
            questions,
            indexOfMobilePreviewQuestion,
            nextQuestionHandler,
            prevQuestionHandler,
            chooseOptionInRankingQuestionHandler,
            mobilePreviewInProgress
        } = this.props;

        if (noSurvey) return null;
        if (!mobilePreviewInProgress) return null;

        if (questions.isEmpty()) {
            return (
                <IPhoneSimulator>
                    <p className="center-align small-margin-right">
                        Please add questions first.
                    </p>
                </IPhoneSimulator>
            )
        }

        if (indexOfMobilePreviewQuestion === -1) {
            return (
                <IPhoneSimulator>
                    <div className="welcome-page">
                        <p className="red-title">推奨環境</p>
                        【PC】<br/>
                        OS：Windows 7以上<br/>
                        ブラウザ：Internet Explorer 11、Edge、Google Chrome 最新版<br/>
                        <br/>
                        【スマートフォン、タブレット】<br/>
                        OS：iOS 10以上<br/>
                        ブラウザ：Safari<br/>
                        <br/>
                        OS：Android 4.4以上<br/>
                        ブラウザ：Google Chrome<br/>
                    </div>
                    <div className="center-align">
                        <Button bsStyle="primary" onClick={nextQuestionHandler}>アンケート開始</Button>
                    </div>
                </IPhoneSimulator>
            )
        }

        if(indexOfMobilePreviewQuestion === questions.size) {
            return (
                <IPhoneSimulator>
                    <p className="end-page">
                        質問は以上で終了です。アンケートを閉じてください。<br/>
                        ご回答いただき、ありがとうございました。<br/>
                    </p>
                </IPhoneSimulator>
            )
        }

        const commonProps = {
            question: questions.get(indexOfMobilePreviewQuestion),
            order: indexOfMobilePreviewQuestion + 1
        };

        const preview = this.getPreview(commonProps, chooseOptionInRankingQuestionHandler);

        return (
            <IPhoneSimulator>
                {preview}
                <div className="center-align">
                    <Button bsStyle="default" style={{marginRight: '25px'}} onClick={prevQuestionHandler}>Prev</Button>
                    <Button bsStyle="primary" onClick={nextQuestionHandler}>Next</Button>
                </div>
            </IPhoneSimulator>
        )

    }

}

export default MobilePreviewPanel;