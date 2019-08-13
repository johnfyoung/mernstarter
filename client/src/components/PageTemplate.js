import React from 'react'
import Header from './Header';
import Footer from './Footer';

export default function PageTemplate(props) {
    return (
        <div className={props.pageClass}>
            <Header nav={props.nav} />
            {props.children}
            <Footer />
        </div>
    )
}
