import React from 'react'
import jQuery from 'jquery'
import { browserHistory } from 'react-router'

export class MappingCreate extends React.Component{
    mapping;
    constructor(){
        super();
        this.state = {
            sysaidFields: [],
            jiraFields: []
        };
        this.mapping = {
            options: []
        }

        this.loadData = this.loadData.bind(this);
        this.save = this.save.bind(this);
    }
    
    loadData(){
        var mappingR = jQuery.ajax({
            method: 'GET',
            url: '/api/mapping/'+ this.props.params['_id'],
            contentType: "application/json; charset=utf-8"
        }),sysaidFieldsR = jQuery.ajax({
            method: 'GET',
            url: '/api/sysaid/field',
            contentType: "application/json; charset=utf-8"
        }),
        jiraFieldsR = jQuery.ajax({
            method: 'GET',
            url: '/api/jira/field',
            contentType: "application/json; charset=utf-8"
        });
        jQuery.when(mappingR, sysaidFieldsR, jiraFieldsR)
        .done( (mappingData, sysaidFieldsData, jiraFieldsData ) =>{
            if( sysaidFieldsData[0].status == true && jiraFieldsData[0].status == true){
                this.setState({
                    sysaidFields: sysaidFieldsData[0]['fields'],
                    jiraFields: jiraFieldsData[0]['fields']
                });
            }else{
                /*this.setState({
                    sysaidFields:  [{
                        "key":"request_user",
                        "keyCaption":"Request user",
                        "value":149,    
                        "valueCaption":"shani1",
                        "mandatory":true,
                        "editable":true,
                        "type":"list",
                        "defaultValue":""
                    }, {
                        "key":"impact",
                        "keyCaption":"Impact",
                        "value":"Low",
                        "valueCaption":"Low",
                        "mandatory":false,
                        "editable":true,
                        "type":"list",
                        "defaultValue":null
                    }],
                    jiraFields: [ {
                        "id": "description",
                        "name": "Description",
                    }, {
                        "id": "summary",
                        "key": "summary",
                        "name": "Summary"
                    }]
                });
                */
                console.log(`SysAid Field Error: ${sysaidFieldsData[0].error}, Jira Feild Error: ${jiraFieldsData[0].error}`)
            }
            if( mappingData[0].status == true){
                this.mapping = mappingData[0].mapping;
                this.refs.mappingName.value = mappingData[0].mapping.name;
                this.refs.mappingSysaidKey.value = mappingData[0].mapping.sysaidField;
                this.refs.mappingJiraKey.value = mappingData[0].mapping.jiraField;
                this.refs.mappingJiraProperty.value = mappingData[0].mapping.jiraProperty;
            }else{
                console.log(`Mapping Error: ${mappingData[0].error}`)
            }
        });
    }
    
    cancel(){
        browserHistory.push('/mappings')
    }
    
    save(evt){
        var url = '/api/mapping',
            method = 'POST';
        if( this.props.params['_id'] != '0' ){
            url += '/' + this.props.params['_id'];
            method = 'PUT';
        }
        var mapping = {
            name: this.refs.mappingName.value,
            options: this.mapping.options,
            sysaidField: this.refs.mappingSysaidKey.value,
            jiraField: this.refs.mappingJiraKey.value,
            jiraProperty: this.refs.mappingJiraProperty.value
        };
        
        jQuery.ajax({
            method: method
            , url: url
            , contentType: "application/json; charset=utf-8"
            , data: JSON.stringify( mapping )
        }).then( (response, status) =>{
            if(status == 'success'){
                if( response.status == true){
                    alert(response.message)
                    browserHistory.push('/mappings')
                }else{
                    alert( response.error )
                }
            }else{
                console.log( 'The sercices has error.' );
            }
        });
        
        evt.preventDefault();
        return true;
    }
    componentDidMount() {
        this.loadData();
    }
    render(){
        return (
            React.createElement('div', { className: 'col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2'}, 
                React.createElement('h2', {}, 'Create Mapping'),
                React.createElement('form', {onSubmit: this.save }, 
                    React.createElement('div', { className: 'form-group'},
                        React.createElement('label', { }, 'Name'),
                        React.createElement('input', { ref: 'mappingName', type: 'text', className: 'form-control', required: true})
                    ),
                    React.createElement('div', { className: 'form-group padding-bottom-15'},
                        React.createElement('div', { className: 'col-lg-6 col-md-6 col-sd-6 no-padding-left form-group'},
                            React.createElement('label', { }, 'Sysaid Key'),
                            React.createElement('select', {ref: 'mappingSysaidKey', className: 'form-control', required: true},
                                React.createElement('option', { value: '0', disabled: true}, 'Select a option'),
                                React.createElement('option', { value: 'id'}, 'id'),
                                this.state.sysaidFields.map( ( sysaidField ) =>{
                                    return React.createElement('option', { key: sysaidField.key, value: sysaidField.key}, sysaidField.keyCaption)
                                })
                            )
                        ),
                        React.createElement('div', { className: 'col-lg-6 col-md-6 col-sd-6 no-padding-right form-group'},
                            React.createElement('label', { }, 'Jira Key'),
                            React.createElement('select', { ref: 'mappingJiraKey', className: 'form-control', required: true},
                                React.createElement('option', { value: '0', disabled: true}, 'Select a option'),
                                React.createElement('option', { value: 'key'}, 'key'),
                                this.state.jiraFields.map( ( jiraField ) =>{
                                    return React.createElement('option', { key: jiraField.id,  value: jiraField.id}, jiraField.name)
                                })
                            )
                        )
                    ), 
                    React.createElement('div', { className: 'form-group'},
                        React.createElement('label', { }, 'Jira Property'),
                        React.createElement('input', { ref: 'mappingJiraProperty', type: 'text', className: 'form-control'})
                    ),
                    React.createElement('div', { className: 'form-group margin-top-15'},
                        React.createElement('a', { onClick: this.cancel, className: 'btn btn-default margin-right-15'},
                            React.createElement('i', {className: 'glyphicon glyphicon-remove'}),
                            ' Cancel'
                        ),
                        React.createElement('button', { className: 'btn btn-primary', type: 'submit'},
                            React.createElement('i', {className: 'glyphicon glyphicon-ok'}),
                            ' Save'
                        )
                    )
                )
            )
        )
    }
}