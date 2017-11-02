/**
 * Created by sheng.wang on 2017/07/25.
 */

import React from "react";
import {PureComponent} from "react/lib/ReactBaseClasses";
import {
    createOptionConfigHandlerForOptionList, HelpBlocks, OptionConfigs, RequiredLabel,
    StandardQuestionConfig
} from "./QuestionConfig";
import FormGroup from "react-bootstrap/es/FormGroup";
import ControlLabel from "react-bootstrap/es/ControlLabel";
import FormControl from "react-bootstrap/es/FormControl";


const Candidates = (props) => {
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

class RankConfig extends PureComponent {

    render() {
        const {question, ...optionHandlers} = this.props;
        const propsForCandidatesConfigHandler = createOptionConfigHandlerForOptionList({optionListName: "row", ...optionHandlers});

        return (
            <StandardQuestionConfig {...this.props}>
                <FormGroup className="std-horizontal-layout">
                    <ControlLabel>必須選択順位<RequiredLabel/></ControlLabel>
                    <FormControl componentClass="select" placeholder="select" value={question.numberOfRanks} style={{width: "auto"}}
                                 onChange={evt => this.props.changeQuestionProperty("numberOfRanks", evt.target.value)}>
                        {question.candidates.map((candidate, index) => <option key={index}
                                                                               value={index + 1}>{index + 1}</option>)}
                    </FormControl>
                </FormGroup>
                <Candidates options={question.candidates} {...propsForCandidatesConfigHandler} />
            </StandardQuestionConfig>
        );
    }

}

export default RankConfig;