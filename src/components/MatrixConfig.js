/**
 * Created by sheng.wang on 2017/07/25.
 */
import FormGroup from "react-bootstrap/es/FormGroup";
import {
    OptionConfigs, HelpBlocks, StandardQuestionConfig, createOptionConfigHandlerForOptionList
} from "./QuestionConfig";
import React from "react";
import ControlLabel from "react-bootstrap/es/ControlLabel";

const RowsConfigs = (props) => {
    const helpTexts = [
        "※最大500個登録出来ます。"
    ];

    return (
        <FormGroup controlId="rows">
            <ControlLabel>質問アイテム</ControlLabel>
            <OptionConfigs {...props}/>
            <HelpBlocks helpTexts={helpTexts}/>
        </FormGroup>
    );
};

const ColumnsConfigs = (props) => {
    const helpTexts = [
        "※最大500個登録出来ます。",
        "※選択肢／質問アイテムにおいて引継ぎ設定された予約語を直接編集した場合、引継ぎ設定は解除され、文字列として反映されます。",
        "※選択肢／質問アイテムにおいて引継ぎ設定された予約語に直接タグを入力した場合、引継ぎ設定は解除され、文字列として反映されます。"
    ];

    return (
        <FormGroup controlId="columns">
            <ControlLabel>選択肢</ControlLabel>
            <OptionConfigs {...props}/>
            <HelpBlocks helpTexts={helpTexts}/>
        </FormGroup>
    );
};

const MatrixConfig = (props) => {

    const {question, ...optionHandlers} = props;

    const propsForRowsConfigHandler = createOptionConfigHandlerForOptionList({optionListName: "row", ...optionHandlers});
    const propsForColumnsConfigHandler = createOptionConfigHandlerForOptionList({optionListName: "column", ...optionHandlers});

    return (
        <StandardQuestionConfig {...props}>
            <RowsConfigs options={question.rows} {...propsForRowsConfigHandler}/>
            <ColumnsConfigs options={question.columns} {...propsForColumnsConfigHandler}/>
        </StandardQuestionConfig>
    )
};

export default MatrixConfig;