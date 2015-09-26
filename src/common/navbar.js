import React from 'react'
import AppBar from 'material-ui/lib/app-bar'

export default class NavBar extends React.Component {
    render() {
        return (
            <AppBar
                title="Title"
                iconClassNameRight="muidocs-icon-navigation-expand-more"/>
        )
    }
}
