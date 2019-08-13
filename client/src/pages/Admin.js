import React from 'react';
import PageTemplate from '../components/PageTemplate';

export default function Admin(props) {
    return (
        <PageTemplate pageClass="page-admin" nav={props.nav}>
            Here is an admin page
        </PageTemplate>
    )
}
