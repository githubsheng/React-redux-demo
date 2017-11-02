/**
 * Created by sheng.wang on 2017/07/25.
 */

import {PureComponent} from "react/lib/ReactBaseClasses";
import React from "react";

class StandardQuestionPreview extends PureComponent {
    render(){
        const {question, order, selectQuestionHandler = () => {}, isSelected = false, children} = this.props;
        const isSelectedClassName = isSelected ? "selected" : "";
        const questionContainerClassName = `question-container ${isSelectedClassName}`;
        return (
            <div className={questionContainerClassName} onClick={evt => selectQuestionHandler(question.id)}>
                <div className="prev-question-text">
                    {question.preQuestionText}
                </div>
                <div className="question-text">
                    <span className="small-margin-right">{order}.</span>{question.questionText || "質問文"}
                </div>
                <div className="post-question-text">
                    {question.postQuestionTextOne}
                </div>
                {children}
                <div className="post-question-text">
                    {question.postQuestionTextTwo}
                </div>
            </div>
        )
    }
}

export default StandardQuestionPreview;