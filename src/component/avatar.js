import React from 'react';
import {TextInput} from 'react-admin';
import {Avatar as MuiAvatar} from '@material-ui/core';
import get from 'lodash/get';

export const AvatarField = (props) => {
    return (<MuiAvatar src={get(props.record, props.source)} {...props}/>);
};

export const AvatarInput = (props) => {
    console.log("Avatar props = ", props);
    return (<TextInput {...props}/>);
}