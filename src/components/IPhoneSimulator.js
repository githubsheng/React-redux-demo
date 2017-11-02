/**
 * Created by sheng.wang on 2017/08/22.
 */
import {PureComponent} from "react/lib/ReactBaseClasses";
import React from "react";

export class IPhoneSimulator extends PureComponent {

    render(){
        return (
            <div id="iphone">
                <img id="iphone-image" src="iphone6.png"/>
                <div id="iphone-screen">
                    {this.props.children}
                </div>
            </div>
        )
    }

}