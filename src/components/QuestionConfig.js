/**
 * Created by sheng.wang on 2017/07/15.
 */

import "./styles/question-config.css"
import "./styles/commons.css"
import React from 'react';
import FormControl from "react-bootstrap/es/FormControl";
import DropdownButton from "react-bootstrap/es/DropdownButton";
import MenuItem from "react-bootstrap/es/MenuItem";
import ToggleButtonGroup from "react-bootstrap/es/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/es/ToggleButton";
import PropTypes from 'prop-types';
import FormGroup from "react-bootstrap/es/FormGroup";
import ControlLabel from "react-bootstrap/es/ControlLabel";
import HelpBlock from "react-bootstrap/es/HelpBlock";
import Button from "react-bootstrap/es/Button";
import {List} from "../../node_modules/immutable/dist/immutable";
import SelectQuestionTypeSplitButton from "./SelectQuestionTypeSplitButton";
import {curry} from "lodash";
import {PureComponent} from "react/lib/ReactBaseClasses";
import {uuidv4} from "../commons/Utily";

//we don't really need control id cos this page is not for blind people.
const randomControlId = () => Date.now().toString();

const RequiredLabel = () => (
    <span className="required">必須</span>
);

const HelpBlocks = (props) => {
    if (props.helpTexts) {
        return (
            <HelpBlock>
                {props.helpTexts.map((ht) => <div key={ht}>
                    <small>{ht}</small>
                </div>)}
            </HelpBlock>
        );
    }
    return null;
};

HelpBlocks.propTypes = {
    helpTexts: PropTypes.arrayOf(PropTypes.string)
};

const MultipleChoiceRowConfig = () => (
    <div className="row-config-container small-padding" disabled={true}>
        <input type="check" disabled={true} className="small-padding"/>
        <FormControl placeholder="lead sentence"/>
    </div>
);

const QuestionPreferenceChoice = (props) => (
    <div className="std-horizontal-layout std-margin-bottom">
        <div className="small-margin-right">
            <strong>
                {props.labelText}
                {props.isInputRequired && <RequiredLabel/>}
            </strong>
        </div>
        <ToggleButtonGroup type="radio" name="options" defaultValue={props.defaultValue} value={props.value}
                           onChange={newValue => props.clickHandler(props.name, newValue)}>
            {props.options.map(option =>
                <ToggleButton key={option.value}
                              bsSize="small"
                              value={option.value}
                >
                    {option.text}
                </ToggleButton>)}
        </ToggleButtonGroup>
    </div>
);

QuestionPreferenceChoice.propTypes = {
    labelText: PropTypes.string.isRequired,
    isInputRequired: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    })),
    clickHandler: PropTypes.func.isRequired
};

const IsRequiredToAnswer = (props) => {
    const options = [{value: "required", text: "必須"}, {value: "notRequired", text: "任意"}];
    return <QuestionPreferenceChoice
        labelText="回答必須"
        isInputRequired={true}
        defaultValue={"required"}
        options={options}
        name="isAnswerRequired"
        value={props.value}
        clickHandler={props.clickHandler}
    />;
};

IsRequiredToAnswer.propTypes = {
    value: PropTypes.oneOf(["required", "notRequired"]).isRequired,
    clickHandler: PropTypes.func.isRequired
};

const WhiteSpaceWrapOnMobile = (props) => {
    const options = [{value: "valid", text: "有効"}, {value: "invalid", text: "無効"}];
    return <QuestionPreferenceChoice
        labelText="スマホ回答時改行"
        isInputRequired={true}
        defaultValue={"valid"}
        options={options}
        name="whiteSpaceWrapOnMobile"
        value={props.value}
        clickHandler={props.clickHandler}
    />;
};

WhiteSpaceWrapOnMobile.propTypes = {
    value: PropTypes.oneOf(["valid", "invalid"]).isRequired,
    clickHandler: PropTypes.func.isRequired
};

const CanSelectSameOption = (props) => {
    const options = [{value: "can", text: "利用可"}, {value: "cannot", text: "利用不可"}];
    return <QuestionPreferenceChoice
        labelText="同一選択肢利用可否"
        isInputRequired={true}
        defaultValue={"cannot"}
        options={options}
        name="canSelectSameOption"
        value={props.value}
        clickHandler={props.clickHandler}
    />;
};

CanSelectSameOption.propTypes = {
    value: PropTypes.oneOf(["can", "cannot"]).isRequired,
    clickHandler: PropTypes.func.isRequired
};

const TextArea = (props) => (

    <FormGroup controlId={randomControlId()}>
        <ControlLabel>{props.labelText}{props.isInputRequired && <RequiredLabel/>}</ControlLabel>
        <FormControl placeholder={props.placeholder} value={props.value} componentClass="textarea"
                     onChange={evt => props.onChange(props.name, evt.target.value, props.questionId)}/>
        <HelpBlocks helpTexts={props.helpTexts}/>
    </FormGroup>
);

TextArea.propTypes = {
    labelText: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    helpTexts: PropTypes.arrayOf(PropTypes.string),
    isInputRequired: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

TextArea.defaultProps = {
    isInputRequired: false
};

const questionTextPropTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

const PreQuestionText = (props) => {
    const helpTexts = [
        "※引継ぎ設定された予約語を直接編集した場合、引継ぎ設定は解除され、文字列として反映されます。",
        "※PC表示のデフォルトフォントサイズは15px、スマートフォン表示は14pxとなります。"
    ];
    const selfProps = {
        labelText: "リード文",
        placeholder: "リード文",
        helpTexts: helpTexts,
        name: "preQuestionText",
        value: props.value,
        onChange: props.onChange,
        questionId: props.questionId
    };
    return <TextArea {...selfProps}/>
};

PreQuestionText.propTypes = questionTextPropTypes;

const QuestionText = (props) => {
    const helpTexts = [
        "※引継ぎ設定された予約語を直接編集した場合、引継ぎ設定は解除され、文字列として反映されます。",
        "※PC表示のデフォルトフォントサイズは15px、スマートフォン表示は13pxとなります。"
    ];
    const selfProps = {
        labelText: "質問文",
        placeholder: "質問文",
        helpTexts: helpTexts,
        isInputRequired: true,
        name: "questionText",
        value: props.value,
        onChange: props.onChange,
        questionId: props.questionId
    };
    return <TextArea {...selfProps} />
};

QuestionText.propTypes = questionTextPropTypes;

const PostQuestionTextOne = (props) => {
    const selfProps = {
        labelText: "補足文（上）",
        placeholder: "補足文（上）",
        name: "postQuestionTextOne",
        value: props.value,
        onChange: props.onChange,
        questionId: props.questionId
    };
    return <TextArea {...selfProps} />
};

PostQuestionTextOne.propTypes = questionTextPropTypes;

const PostQuestionTextTwo = (props) => {
    const selfProps = {
        labelText: "補足文（下）",
        placeholder: "補足文（下）",
        name: "postQuestionTextTwo",
        value: props.value,
        onChange: props.onChange,
        questionId: props.questionId
    };
    return <TextArea {...selfProps} />
};

PostQuestionTextTwo.propTypes = questionTextPropTypes;

const OptionConfigs = ({
                           options, helpTexts, addOptionAtEndHandler, addOptionBefore, addOptionAfter, removeOption,
                           changeOptionText, placeholder = "Input option text"
                       }) => {
    const optionsJSX = options.map((option, index) => {

        const containerClassName = `row-config-container std-margin-bottom std-horizontal-layout ${option.ui_hasError ? 'has-error' : ''}`;

        return (
            <div key={option.id} className={containerClassName}>
                <div className="small-margin-right">{index + 1}.</div>
                <FormControl placeholder={placeholder} value={option.text}
                             onChange={evt => changeOptionText(option.id, evt.target.value)}/>

                <DropdownButton title={<i className="fa fa-bars" aria-hidden="true"/>} id={uuidv4()} pullRight noCaret>
                    <MenuItem eventKey="1" onClick={() => addOptionBefore(option.id)}>
                        <i className="fa fa-arrow-up small-margin-right" aria-hidden="true"/>
                        選択肢追加
                    </MenuItem>
                    <MenuItem eventKey="2" onClick={() => addOptionAfter(option.id)}>
                        <i className="fa fa-arrow-down small-margin-right" aria-hidden="true"/>
                        選択肢追加
                    </MenuItem>
                    <MenuItem eventKey="3" onClick={() => removeOption(option.id)}>
                        <i className="fa fa-trash text-danger small-margin-right" aria-hidden="true"/>
                        選択肢削除
                    </MenuItem>
                </DropdownButton>
            </div>
        )
    });

    return (
        <FormGroup controlId={randomControlId()}>
            {optionsJSX}
            <div className="add-option-button-container">
                <Button bsStyle="primary" bsSize="small" onClick={() => addOptionAtEndHandler()} style={{width: "50px"}}>
                    <i className="fa fa-plus" aria-hidden="true"/>
                </Button>
            </div>
            <HelpBlocks helpTexts={helpTexts}/>
        </FormGroup>
    )
};

export const optionConfigEventHandlersPropTypes = {
    addOptionBefore: PropTypes.func.isRequired,
    addOptionAfter: PropTypes.func.isRequired,
    removeOption: PropTypes.func.isRequired,
    changeOptionText: PropTypes.func.isRequired
};


OptionConfigs.prototype = Object.assign(
    {options: PropTypes.instanceOf(List).isRequired},
    optionConfigEventHandlersPropTypes);

//add question before, add question after, remove current question
const TopLevelCommands = ({question, addQuestionAfterHandler, addQuestionBeforeHandler, removeQuestionHandler}) => {

    const curriedAddQuestionBeforeHandler = curry(addQuestionBeforeHandler);
    const curriedAddQuestionAfterHandler = curry(addQuestionAfterHandler);

    return (
        <div className="top-btns">
            <Button className="top-btn" bsSize="xsmall" bsStyle="danger" onClick={removeQuestionHandler}>
                <i className="fa fa-trash" aria-hidden="true"/>
            </Button>
            <div className="top-btn">
                <SelectQuestionTypeSplitButton className="small-margin-right" pullRight={true}
                                               handler={curriedAddQuestionBeforeHandler(question.id)} bsSize="xsmall"
                                               title={
                                                   <span>
                                                       <i className="fa fa-arrow-up small-margin-right"
                                                          aria-hidden="true"/>
                                                        質問追加
                                                   </span>
                                               }/>
            </div>
            <div className="top-btn">
                <SelectQuestionTypeSplitButton className="small-margin-right" pullRight={true}
                                               handler={curriedAddQuestionAfterHandler(question.id)} bsSize="xsmall"
                                               title={
                                                   <span>
                                                       <i className="fa fa-arrow-down small-margin-right"
                                                          aria-hidden="true"/>
                                                        質問追加
                                                   </span>
                                               }/>
            </div>
        </div>
    )
};

class StandardQuestionConfig extends PureComponent {

    render() {
        const {
            question,
            changeQuestionProperty,
            addQuestionAfterHandler,
            addQuestionBeforeHandler,
            removeQuestionHandler
        } = this.props;

        const topLevelCommandProps = {
            addQuestionAfterHandler,
            addQuestionBeforeHandler,
            removeQuestionHandler,
            question
        };

        return (
            <div className="question-config">
                <TopLevelCommands {...topLevelCommandProps}/>
                <IsRequiredToAnswer clickHandler={changeQuestionProperty} questionId={question.id}
                                    value={question.isAnswerRequired}/>
                <WhiteSpaceWrapOnMobile clickHandler={changeQuestionProperty} questionId={question.id}
                                        value={question.whiteSpaceWrapOnMobile}/>
                <PreQuestionText onChange={changeQuestionProperty} questionId={question.id}
                                 value={question.preQuestionText}/>
                <QuestionText onChange={changeQuestionProperty} questionId={question.id} value={question.questionText}/>
                <PostQuestionTextOne onChange={changeQuestionProperty} questionId={question.id}
                                     value={question.postQuestionTextOne}/>
                {question.canSelectSameOption !== undefined &&
                <CanSelectSameOption clickHandler={changeQuestionProperty} value={question.canSelectSameOption}/>}
                {this.props.children}
                <PostQuestionTextTwo onChange={changeQuestionProperty} questionId={question.id}
                                     value={question.postQuestionTextTwo}/>
            </div>
        );
    }
}

function createOptionConfigHandlerForOptionList({optionListName, addOptionBefore, addOptionAfter, addOptionAtEndHandler, removeOption, changeOptionText}) {

    function fn() {
        return addOptionAtEndHandler(optionListName);
    }

    return {
        addOptionBefore: curry(addOptionBefore)(curry.placeholder, optionListName),
        addOptionAfter: curry(addOptionAfter)(curry.placeholder, optionListName),
        addOptionAtEndHandler: fn,
        removeOption: curry(removeOption)(curry.placeholder, optionListName),
        changeOptionText: curry(changeOptionText)(curry.placeholder, curry.placeholder, optionListName)
    };
}


export {
    MultipleChoiceRowConfig,
    IsRequiredToAnswer,
    WhiteSpaceWrapOnMobile,
    CanSelectSameOption,
    PreQuestionText,
    QuestionText,
    PostQuestionTextOne,
    PostQuestionTextTwo,
    OptionConfigs,
    HelpBlocks,
    TopLevelCommands,
    StandardQuestionConfig,
    RequiredLabel,
    createOptionConfigHandlerForOptionList
}