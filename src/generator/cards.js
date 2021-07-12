import React from 'react';
import {List} from 'react-admin';
import generateField from './field';
import generateFilters from './filters';
import generateBulkActionButtons from '../generator/bulk-action-buttons';
import ArrowsPagination from '../component/arrow-pagination';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const cardStyle = {
    width: 300,
    minHeight: 300,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top',
};

const contentStyle = {
    paddingTop: "5px",
    paddingBottom: "5px"
}
const CardGrid = (props) => {

    const {ids, data, basePath, listDef} = props;

    console.log("Card props ", props);
    return (
        <div style={{margin: '1em'}}>
            {ids.map(id =>
                <Card key={id} style={cardStyle}>
                    {listDef.fields.map((field) =>
                        <CardContent style={contentStyle}>
                            {generateField({...field, record: data[id], basePath: basePath}, 'list')}
                        </CardContent>
                    )}
                </Card>
            )}
        </div>
    )
};

CardGrid.defaultProps = {
    data: {},
    ids: [],
};

function generateGrid(listDef, filtersDef) {
    if (!listDef) {
        return listDef;
    }

    return (props) => (
        <List key='list' title={listDef.title} bulkActionButtons={generateBulkActionButtons(listDef)} {...props}
              filters={generateFilters(filtersDef)} pagination={<ArrowsPagination/>}>
            <CardGrid listDef={listDef}/>
        </List>
    )
}

export default generateGrid;
