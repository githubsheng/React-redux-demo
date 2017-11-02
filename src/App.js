import React from 'react';
import ConfigPanelContainer from "./containers/ConfigPanelContainer";
import PreviewPanelContainer from "./containers/PreviewPanelContainer";
import HeaderContainer from "./containers/HeaderContainer";
import SearchResultPanelContainer from "./containers/SearchResultPanelContainer";
import MobilePreviewContainer from "./containers/MobilePreviewPanelContainer";
import {PureComponent} from "react/lib/ReactBaseClasses";

class App extends PureComponent {

    render() {
        return (
            <div>
                <HeaderContainer/>
                <div className="main-layout left std-padding">
                    <SearchResultPanelContainer />
                    <ConfigPanelContainer />
                </div>
                <div className="main-layout right">
                    <PreviewPanelContainer />
                    <MobilePreviewContainer />
                </div>
            </div>
        );
    }
}

export default App;
