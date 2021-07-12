import JSONInput from "react-json-editor-ajrm";
import {addField} from "react-admin";
import get from 'lodash/get';
import React from "react";

function MyJsonInput(props) {
    console.log("props=", props);
    return (<JSONInput
        placeholder={props.input.value || {}}
        onChange={val => props.input.onChange(val.jsObject)}
        height={400}
        colors={
            {background: '#242d30'}
        }
    />);
}

function MyJsonView(props) {
    console.log("props=", props);
    return (<JSONInput
        placeholder={get(props.record, props.source) || {}}
        viewOnly={true}
        confirmGood={false}
        height={100}
        theme={"light_mitsuketa_tribute"}
    />);
}

export const JsonInput = addField(MyJsonInput);
export const JsonView = MyJsonView;
