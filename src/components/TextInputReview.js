/**
 * Created by sheng.wang on 2017/07/25.
 */
import {PureComponent} from "react/lib/ReactBaseClasses";
import React from "react";
import StandardQuestionPreview from "./QuestionPreview";

class InputBoxes extends PureComponent {

    render() {
        return (
            <div>
                {
                    this.props.inputBoxes.map((ib, index) => {
                        return (
                            <div key={ib.id}>
                                <div>{ib.text}</div>
                                <input type="text" className="form-control std-margin-bottom"/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

class TextInputReview extends PureComponent {

    render() {
        const {
            question: {
                inputBoxes
            }
        } = this.props;
        return (
            <StandardQuestionPreview {...this.props}>
                <InputBoxes inputBoxes={inputBoxes} />
            </StandardQuestionPreview>
        )
    }

}

export default TextInputReview;