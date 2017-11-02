/**
 * Created by sheng.wang on 2017/07/15.
 */

import React from 'react';
import {
    OptionConfigs, HelpBlocks, optionConfigEventHandlersPropTypes, StandardQuestionConfig
} from "./QuestionConfig";
import FormGroup from "react-bootstrap/es/FormGroup";
import PropTypes from 'prop-types';
import {List} from "../../node_modules/immutable/dist/immutable";


const ChoiceOptionsConfigs = (props) => {
    const helpTexts = [
        "※最大500個登録出来ます。",
        "※引継ぎ設定された予約語を直接編集した場合、引継ぎ設定は解除され、文字列として反映されます。",
        "※引継ぎ設定された予約語に直接タグを入力した場合、引継ぎ設定は解除され、文字列として反映されます。"
    ];

    return (
        <FormGroup controlId="rows">
            <OptionConfigs {...props}/>
            <HelpBlocks helpTexts={helpTexts}/>
        </FormGroup>
    );
};

ChoiceOptionsConfigs.propTypes = Object.assign({
    options: PropTypes.instanceOf(List).isRequired,
}, optionConfigEventHandlersPropTypes);

const ChoiceConfig = (props) => {

    const {question, ...optionHandlers} = props;

    return (
        <StandardQuestionConfig {...props}>
            <ChoiceOptionsConfigs options={question.options} {...optionHandlers}/>
        </StandardQuestionConfig>
    );
};

ChoiceConfig.propTypes = Object.assign({
    question: PropTypes.object.isRequired,
    changeQuestionProperty: PropTypes.func.isRequired,
}, optionConfigEventHandlersPropTypes);

export default ChoiceConfig;