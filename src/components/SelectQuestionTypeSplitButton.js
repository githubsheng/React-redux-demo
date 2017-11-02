/**
 * Created by sheng.wang on 2017/07/24.
 */

import SplitButton from "react-bootstrap/es/SplitButton";
import MenuItem from "react-bootstrap/es/MenuItem";
import React from "react";
import {uuidv4} from "../commons/Utily";
import {
    questionTypeMultipleChoice, questionTypeMultipleChoiceMatrix, questionTypeRanking,
    questionTypeSingleChoice, questionTypeSingleChoiceMatrix, questionTypeTextInput
} from "../commons/QuestionEnums";

const SelectQuestionTypeSplitButton = ({handler, title, bsSize=null, pullRight=false}) => {
    return (
        <SplitButton onClick={evt => handler(questionTypeSingleChoice)}
                     bsStyle="primary" title={title} bsSize={bsSize} pullRight={pullRight}
                     id={uuidv4()} /*we don't need this id really, just give a random value*/>
            <MenuItem eventKey="1" onClick={evt => handler(questionTypeSingleChoice)}>
                Single Choice
            </MenuItem>
            <MenuItem eventKey="2" onClick={evt => handler(questionTypeMultipleChoice)}>
                Multiple Choice
            </MenuItem>
            <MenuItem divider/>
            <MenuItem eventKey="3" onClick={evt => handler(questionTypeSingleChoiceMatrix)}>
                Single Choice Matrix
            </MenuItem>
            <MenuItem eventKey="4" onClick={evt => handler(questionTypeMultipleChoiceMatrix)}>
                Multiple Choice Matrix
            </MenuItem>
            <MenuItem divider/>
            <MenuItem eventKey="5" onClick={evt => handler(questionTypeTextInput)}>
                Text Input
            </MenuItem>
            {/*<MenuItem eventKey="6" onClick={evt => handler(questionTypeNumberInput)}>*/}
                {/*Multiple Choice Matrix*/}
            {/*</MenuItem>*/}
            <MenuItem divider/>
            <MenuItem eventKey="7" onClick={evt => handler(questionTypeRanking)}>
                Ranking
            </MenuItem>
        </SplitButton>
    )
};

export default SelectQuestionTypeSplitButton;