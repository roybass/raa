import React from 'react';
import generateIcon from '../generator/icon';

const style = {
  verticalAlign: 'middle'
};

const optionRenderer = choice => {
  if (choice.name && choice.icon) {
    return (<span>{generateIcon(choice.icon, {style})} <span>{choice.name}</span></span>);
  }
  if (choice.icon) {
    return (<span>{generateIcon(choice.icon, {style})}</span>);
  }
  const name = choice.name || "";
  console.log("name = ", choice);
  return (<span>{name}</span>);
};


export default optionRenderer;
