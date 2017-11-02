/**
 * Created by sheng.wang on 2017/07/25.
 */

import {PureComponent} from "react/lib/ReactBaseClasses";
import React from "react";
import StandardQuestionPreview from "./QuestionPreview";
import {List} from "../../node_modules/immutable/dist/immutable";
import Button from "react-bootstrap/es/Button";

class RankPreview extends PureComponent {

    render() {

        const {
            question: {
                id: questionId,
                numberOfRanks,
                temp,
                answers = List()
            }, chooseOptionInRankingQuestionHandler
        } = this.props;

        const chosenCandidateId = temp ? temp.chosenCandidateId : undefined;

        function WithAnswers(props) {
            return (
                <StandardQuestionPreview {...props}>
                    <div className="ranks">
                        {
                            answers.slice(0, numberOfRanks)
                                .map((a, index) =>
                                    <div>
                                        <span>#{index + 1}.</span>
                                        <Button key={a.id} bsStyle={chosenCandidateId === a.id ? "primary" : "default"}
                                                onClick={evt => {
                                                    evt.stopPropagation();
                                                    chooseOptionInRankingQuestionHandler(questionId, a.id)
                                                }}>{a.text || "input option text"}</Button>
                                    </div>)
                        }
                    </div>
                    <div className="candidates">
                        {
                            answers.slice(numberOfRanks)
                                .map(a =>
                                    <div>
                                        {/*placeholder*/}
                                        <span></span>
                                        <Button key={a.id}
                                                bsStyle={chosenCandidateId === a.id ? "primary" : "default"}
                                                onClick={evt => {
                                                    evt.stopPropagation();
                                                    chooseOptionInRankingQuestionHandler(questionId, a.id)
                                                }}>{a.text || "Input option text"}</Button>
                                    </div>)
                        }
                    </div>
                </StandardQuestionPreview>
            )
        }

        function WithoutAnswers(props) {
            return (
                <StandardQuestionPreview {...props}>
                    Please add candidates
                </StandardQuestionPreview>
            )
        }

        return answers.isEmpty() ? <WithoutAnswers {...this.props}/> : <WithAnswers {...this.props}/>;
    }

}

export default RankPreview;