// @flow

import React from 'react';
import type { ComponentType } from 'react';

import { withRouter } from 'react-router';

import { CardContent, MixedCardContainer, ContentBox } from 'components/Card';
import HeadlineNumbers from "components/HeadlineNumbers";
import type { Props } from './Cases.types';
import { getParams } from "common/utils";
import usePageLayout from "hooks/usePageLayout";
import URLs from "common/urls";
import Loading from "components/Loading";
import MSOAs from "components/MSOAs";


const
    DefaultParams = [
        { key: 'areaName', sign: '=', value: 'United Kingdom' },
        { key: 'areaType', sign: '=', value: 'overview' }
    ];


const Cases: ComponentType<Props> = ({ location: { search: query }}: Props) => {

    const
        urlParams = getParams(query),
        layout = usePageLayout(URLs.pageLayouts.cases,  null),
        params = urlParams.length ? urlParams : DefaultParams;

    if ( !layout ) return <Loading large={ true }/>;

    return <>
        <ContentBox horizontal>
            <HeadlineNumbers params={ params } { ...layout }/>
        </ContentBox>
        <MixedCardContainer>{
            layout?.cards.map((cardProps, index) =>
                <CardContent key={ `card-${ index }` } params={ params } { ...cardProps }/>
            ) ?? null
        }
        <MSOAs/>
        </MixedCardContainer>
    </>
};

export default withRouter(Cases);
