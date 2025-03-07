// @flow

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { createQuery, getParams, getParamValueFor } from "common/utils";
import useGenericAPI from "hooks/useGenericAPI";
import Loading from "components/Loading";
import FormItem, { Form } from "components/Formset";

import type { ComponentType } from "react";


export const TypeSearch: ComponentType<*> = ({}) => {

    const history = useHistory();
    let params = getParams(history.location.search);
        const options = useGenericAPI(
        "genericApiChangeLogsComponent",
        null,
        {component: "types"}
    );
    const [type, setType] = useState(getParamValueFor(params, "type", ""));

    useEffect(() => {
        if ( type ) {
            params.push({key: "type", sign: "=", value: type});
        } else {
            params = params.filter(item => item.key !== "type");
        }
        // do not push into history stack when not searched
        if( params !== undefined && params.length !== 0 ) {
            history.push({ search: createQuery(params) });
        }
    }, [type]);

    if ( !options ) return <Loading/>;

    return <Form className={ "govuk-!-padding-left-0 govuk-!-padding-right-5" }>
        <FormItem aria-labelledby={ "type-filter-label" }
             aria-describedby={ "type-filter-descr" }
             className={ "inline govuk-!-margin-top-2" }
             width={ "full" }>
            <span id={ "type-filter-label" } className={ "govuk-label govuk-label--s" }>
                Type
            </span>
            <div id={ "type-filter-descr" } className={ "govuk-hint govuk-!-font-size-16" }>
                <p className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>
                    Filter data by a specific type &mdash; e.g. DATA ISSUES
                    <span className={ "govuk-visually-hidden" }>
                        Your selection will be applied automatically.
                    </span>
                </p>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <select
                    id={ "search" }
                    name={ "search" }
                    className={ "govuk-select" }
                    onChange={ e => setType(e.target.value) }
                    value={ type }
                >
                    <option value={ "" }>-------</option>
                    {
                        options.map(({ tag }) =>
                            <option key={ tag } value={ tag }>
                                { tag.toUpperCase() }
                            </option>
                        )
                    }
                </select>
            </div>
        </FormItem>
    </Form>;

};  // DateSearch
