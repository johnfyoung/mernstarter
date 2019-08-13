import React from 'react'
import Nav from './Nav'

export default function Header(props) {
    return (
        <header>
            <Nav nav={props.nav} />
        </header>
    )
}
