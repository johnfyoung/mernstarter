import React from 'react'
import Header from './Header';
import Footer from './Footer';

import '../resources/scss/PageTemplate.scss';

export default function PageTemplate({ pageClass, children, nav }) {
    return (
        <div className={`page-template ${pageClass}`}>
            <Header nav={nav} />

            {children}
            <Footer />
        </div>
    )
}
