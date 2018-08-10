import React from 'react';
import { Datagrid, List, TextField } from 'react-admin';

const fields = [
  {source: "id", type: "TextField"},
  {source: "title", type: "TextField"},
  {source: "body", type: "TextField"}
];

function generateField(field) {
  switch (field.type) {
    case "TextField":
      return (<TextField source={field.source}/>);
    default:
      throw new Error("unkonwn field type " + field.type);
  }
}


export const PostList = (props) => (
    <List {...props}>
      <Datagrid>
        {fields.map((field) => generateField(field))}
      </Datagrid>
    </List>
);
