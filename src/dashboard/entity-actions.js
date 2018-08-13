import React from 'react';
import { CardActions, CreateButton, ExportButton, RefreshButton } from 'react-admin';
import ExportModelAction from './export-model-action';
export const EntityActions = ({
                                basePath,
                                currentSort,
                                displayedFilters,
                                exporter,
                                filters,
                                filterValues,
                                resource,
                                showFilter
                              }) => (
  <CardActions>
    {filters && React.cloneElement(filters, {
      resource,
      showFilter,
      displayedFilters,
      filterValues,
      context: 'button',
    }) }
    <CreateButton basePath={basePath}/>
    <ExportButton resource={resource} sort={currentSort} filter={filterValues} exporter={exporter}/>
    <RefreshButton />
    <ExportModelAction resource={resource}/>
  </CardActions>
);
