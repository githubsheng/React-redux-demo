/**
 * Created by sheng.wang on 2017/07/21.
 */

import './styles/main-layout.css';
import "./styles/header.css";
import React from 'react';
import FormControl from "react-bootstrap/es/FormControl";
import Button from "react-bootstrap/es/Button";
import {PureComponent} from "react/lib/ReactBaseClasses";

class Header extends PureComponent {

    render() {

        const {
            searchValue,
            searchInProgress,
            loadSurveyInProgress,
            updateSearchValue,
            searchSurvey,
            createSurvey,
            undo,
            redo,
            toggleMobilePreview,
            noSurvey
        } = this.props;

        return (
            <div className="top header std-horizontal-layout">
                <div className="logo">
                    Survey Creation
                </div>
                <FormControl className="search-bar small-margin-right" value={searchValue}
                             onChange={evt => updateSearchValue(evt.target.value)}/>
                <Button bsStyle="primary" className="small-margin-right"
                        onClick={evt => searchSurvey(searchValue)}
                        disabled={searchInProgress || loadSurveyInProgress || searchValue.trim() === ""}>
                    <i className="fa fa-search" aria-hidden="true"/>
                </Button>
                <Button bsStyle="primary" className="create-button"
                        onClick={createSurvey}
                        disabled={searchInProgress || loadSurveyInProgress || searchValue.trim() === ""}>
                    <i className="fa fa-plus" aria-hidden="true"/>
                </Button>
                <Button bsStyle="primary" className="small-margin-right"
                        onClick={undo}
                        disabled={noSurvey}>
                    <i className="fa fa-undo" aria-hidden="true"/>
                </Button>
                <Button bsStyle="primary" className="small-margin-right"
                        onClick={redo}
                        disabled={noSurvey}>
                    <i className="fa fa-repeat" aria-hidden="true"/>
                </Button>
                <Button bsStyle="primary" className="small-margin-right"
                        onClick={toggleMobilePreview}
                        disabled={noSurvey}>
                    <i className="fa fa-eject fa-rotate-90" aria-hidden="true"/>
                </Button>
            </div>
        );
    }
}

export default Header;
