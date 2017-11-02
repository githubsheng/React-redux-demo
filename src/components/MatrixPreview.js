/**
 * Created by sheng.wang on 2017/07/25.
 */

import {PureComponent} from "react/lib/ReactBaseClasses";
import React from "react";
import StandardQuestionPreview from "./QuestionPreview";

class SubQuestion extends PureComponent {

    constructor(props) {
        super(props);
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse() {
        this.self.classList.toggle("sub-open");
        this.icon.classList.toggle("fa-rotate-90");
    }

    render() {

        const {row, columns, isOpen, isMultiple} = this.props;
        const subOpen = isOpen ? "sub-open" : "";
        const subClassName = `sub-question ${subOpen}`;
        const iconRotate = isOpen ? "fa-rotate-90" : "";
        const iconClassName = `fa fa-chevron-right ${iconRotate}`;

        return (
            <div className={subClassName} ref={self => {
                this.self = self;
            }}>
                <div className="sub-question-text" onClick={this.toggleCollapse}>
                    <i className={iconClassName} ref={icon => {
                        this.icon = icon;
                    }} aria-hidden="true"/>
                    {row.text || "質問アイテム"}
                </div>
                <div className="columns">
                    <div className="choice-rows-container">
                        <form>
                            {columns.map(col => {
                                return (
                                    <div key={col.id} className="std-horizontal-layout choice-row">
                                        <input type={isMultiple ? "checkbox" : "radio"} name="choice"/>
                                        <div>{col.text || "選択肢"}</div>
                                    </div>
                                );
                            })}
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

class MatrixPreview extends PureComponent {

    render() {
        const {
            question: {
                rows,
                columns
            }, isMultiple
        } = this.props;
        return (
            <StandardQuestionPreview {...this.props}>
                <div>
                    {rows.map((row, index) => {
                        const isOpen = index === 0;
                        return (<SubQuestion key={row.id} row={row} columns={columns} isMultiple={isMultiple}
                                             isOpen={isOpen}/>)
                    })}
                </div>
            </StandardQuestionPreview>
        )
    }

}

export default MatrixPreview;