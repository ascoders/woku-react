import React from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator} from 'material-ui/lib/toolbar'
import DropDownMenu from 'material-ui/lib/drop-down-menu'
import DropDownIcon from 'material-ui/lib/drop-down-icon'
import FontIcon from 'material-ui/lib/font-icon'
import RaisedButton from 'material-ui/lib/raised-button'

export default class NavBar extends React.Component {
    render() {
        let filterOptions = [
            {payload: '1', text: 'All Broadcasts'},
            {payload: '2', text: 'All Voice'},
            {payload: '3', text: 'All Text'},
            {payload: '4', text: 'Complete Voice'},
            {payload: '5', text: 'Complete Text'},
            {payload: '6', text: 'Active Voice'},
            {payload: '7', text: 'Active Text'},
        ]

        let iconMenuItems = [
            {payload: '1', text: 'Download'},
            {payload: '2', text: 'More Info'}
        ]

        return (
            <Toolbar>
                <ToolbarGroup key={0} float="left">
                    <DropDownMenu menuItems={filterOptions}/>
                </ToolbarGroup>
                <ToolbarGroup key={1} float="right">
                    <ToolbarTitle text="Options"/>
                    <FontIcon className="mui-icon-sort"/>
                    <DropDownIcon iconClassName="icon-navigation-expand-more" menuItems={iconMenuItems}/>
                    <ToolbarSeparator/>
                    <RaisedButton label="Create Broadcast" primary={true}/>
                </ToolbarGroup>
            </Toolbar>
        )
    }
}
