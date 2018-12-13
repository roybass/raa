import React from 'react';
import * as icons from '@material-ui/icons';
import { SelectInput } from 'react-admin';
import generateIcon from '../generator/icon';

const iconNames = Object.keys(icons);
const choices = iconNames.map(i => {
  return { id: i, name: i, key: i };
});

const optionRenderer = choice => (<span>{generateIcon(choice.name)}  {choice.name}</span>);


const IconSelect = ({ className, ...rest }) => (
  <SelectInput
    translateChoice={false}
    className={className}
    {...rest}
    choices={choices}
    optionText={optionRenderer}
  />
);

export default IconSelect;
