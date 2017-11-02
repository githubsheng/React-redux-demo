/**
 * Created by sheng.wang on 2017/07/19.
 */
import "./styles/commons.css";
import "./styles/question-preview.css";
import React from 'react';
import {PureComponent} from "react/lib/ReactBaseClasses";
import StandardQuestionPreview from "./QuestionPreview";

const ChoicePreviewOption = ({options, isMultiple}) => {
    const previews = options.map((option, index) => {
        return (
            <div key={option.id} className="std-horizontal-layout choice-row">
                <input type={isMultiple ? "checkbox" : "radio"} name="choice"/>
                <div>{option.text || "選択肢"}</div>
            </div>
        )
    });

    return (
        <div className="choice-rows-container">
            <form>
                {previews}
            </form>
        </div>
    )
};

class ChoicePreview extends PureComponent {
    render() {
        const {question, isMultiple} = this.props;
        return (
            <StandardQuestionPreview {...this.props}>
                <ChoicePreviewOption options={question.options} isMultiple={isMultiple}/>
            </StandardQuestionPreview>
        );
    }
}

export default ChoicePreview;