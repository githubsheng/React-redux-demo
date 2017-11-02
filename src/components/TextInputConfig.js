/**
 * Created by sheng.wang on 2017/07/15.
 */

import React from 'react';
import {
    OptionConfigs, HelpBlocks, StandardQuestionConfig, createOptionConfigHandlerForOptionList
} from "./QuestionConfig";
import FormGroup from "react-bootstrap/es/FormGroup";
import ControlLabel from "react-bootstrap/es/ControlLabel";


const InputBoxesConfigs = (props) => {

    const helpTexts = [
        "※You can have multiple input boxes"
    ];

    return (
        <FormGroup controlId="rows">
            <ControlLabel>テキストボックス</ControlLabel>
            <OptionConfigs {...props} placeholder="title for input box" addButtonText="Add input box"/>
            <HelpBlocks helpTexts={helpTexts}/>
        </FormGroup>
    );
};

const TextInputConfig = (props) => {
    const {question, ...optionHandlers} = props;
    const propsForInputBoxesConfigHandler = createOptionConfigHandlerForOptionList({optionListName: "inputBoxes", ...optionHandlers});
    return (
        <StandardQuestionConfig {...props}>
            <InputBoxesConfigs options={question.inputBoxes} {...propsForInputBoxesConfigHandler} />
        </StandardQuestionConfig>
    );
};

export default TextInputConfig;