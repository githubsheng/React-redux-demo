/**
 * Created by sheng.wang on 2017/07/14.
 */
import './styles/main-layout.css';
import './styles/commons.css';
import React from 'react';
import * as QuestionEnums from "../commons/QuestionEnums";
import ChoiceConfig from "./SingleChoiceConfig";
import MatrixConfig from "./MatrixConfig";
import TextInputConfig from "./TextInputConfig";
import RankConfig from "./RankConfig";
import {PureComponent} from "react/lib/ReactBaseClasses";

class ConfigPanel extends PureComponent {

    render() {

        if (this.props.noSurvey) return null;

        let questionConfig = null;

        const {selectedQuestion, ...rest} = this.props;

        if (selectedQuestion !== null && selectedQuestion !== undefined) {
            switch (selectedQuestion.type) {
                case QuestionEnums.questionTypeSingleChoice:
                case QuestionEnums.questionTypeMultipleChoice:
                    questionConfig = (<ChoiceConfig
                        question={selectedQuestion}
                        {...rest}
                    />);
                    break;
                case QuestionEnums.questionTypeSingleChoiceMatrix:
                case QuestionEnums.questionTypeMultipleChoiceMatrix:
                    questionConfig = (<MatrixConfig
                        question={selectedQuestion}
                        {...rest}
                    />);
                    break;
                case QuestionEnums.questionTypeTextInput:
                    questionConfig = (<TextInputConfig
                        question={selectedQuestion}
                        {...rest}/>);
                    break;
                case QuestionEnums.questionTypeRanking:
                    questionConfig = (<RankConfig
                        question={selectedQuestion}
                        {...rest}/>);
                    break;
                default:
                    throw new Error("illegal question type");
            }
        }

        return (
            <div className="config-container">
                {questionConfig || <div className="no-question-selected">No question is selected</div>}
            </div>
        )
    }
}

export default ConfigPanel;