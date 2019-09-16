import React from 'react'
import jQuery from 'jquery'

export class Home extends React.Component{
    constructor(){
        super();
        this.state = {
            jiraMappings: [],
            sysaidMappings: []
        }
        this.loadData = this.loadData.bind(this);
    }

    loadData( ){
        var sysaidMappingsR = jQuery.ajax({
            method: 'GET',
            url: '/api/service/sysaid',
            contentType: "application/json; charset=utf-8"
        }),
        jiraMappingsR = jQuery.ajax({
            method: 'GET',
            url: '/api/service/jira',
            contentType: "application/json; charset=utf-8"
        })
        jQuery.when(sysaidMappingsR, jiraMappingsR).done( (sysaidMappingsData, jiraMappingsData ) =>{
            if( sysaidMappingsData[0].status == true && jiraMappingsData[0].status == true ){
                this.setState({
                    jiraMappings: sysaidMappingsData[0].service.mappings,
                    sysaidMappings: jiraMappingsData[0].service.mappings
                })
            }
        });
    }

    componentDidMount() {
        this.loadData();
    }

    render(){
        return (
            React.createElement( 'div', { className: 'col-lg-12 no-padding'}, 
                React.createElement('h2', {}, 'SysAid / Jira Integration'),
                React.createElement( 'div', {className: 'col-lg-6'},
                    React.createElement('h4', {},
                        'SysAid',
                        React.createElement('br', {}),
                        React.createElement('small', {}, 'http://HOSTNAME:PORT/api/sysaid/{serviceRequestId}/sync')
                    ),
                    React.createElement('h4', {},
                        'Fields send to Jira'
                    ),
                    React.createElement('div',{className: 'well well-sm'},
                        this.state.sysaidMappings.length > 0? this.state.sysaidMappings.map( (mapping)=>{
                            return React.createElement('div', { },
                                'Jira field ',
                                React.createElement('b',{}, mapping.jiraField),
                                ' equal to SysAid field ',
                                React.createElement('b',{}, mapping.sysaidField)
                            )
                        })
                        : React.createElement('div', {className: 'alert alert-info'},'No field mapping to send at Jira')
                    )
                ),
                React.createElement( 'div', {className: 'col-lg-6'},
                    React.createElement('h4', {}, 
                        'Jira',
                        React.createElement('br', {}),
                        React.createElement('small', {}, 'http://HOSTNAME:PORT/api/jira/{issuekey}/sync')
                    ),
                    React.createElement('h4', {},
                        'Fields send to SysAid'
                    ),
                    React.createElement('div',{className: 'well well-sm'},
                        this.state.jiraMappings.length > 0? this.state.jiraMappings.map( (mapping)=>{
                            return React.createElement('div',{ },
                                'SysAid field ',
                                React.createElement('b',{}, mapping.sysaidField),
                                ' equal to Jira field ',
                                React.createElement('b',{}, mapping.jiraField)
                            )
                        })
                        : React.createElement('div', {className: 'alert alert-info'},'No field mapping to send at SysAid')
                    )
                ) 
            )
        )
    }
}