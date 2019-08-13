import React from 'react';
import PageTemplate from '../components/PageTemplate';

export default function NotFound(props) {
    return (
        <PageTemplate pageClass="page-not-found" nav={props.nav}>
            404 - Not Found
        </PageTemplate>
    )
}
