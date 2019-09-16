import React from 'react'
import jQuery from 'jquery'
import { browserHistory } from 'react-router'

export class OptionCreate extends React.Component{
    constructor(){
        super();
        this.state = {
            sysaidOptions: [],
            jiraOptions: [],
            mapping: {}
        };
        this.loadOptionData = this.loadOptionData.bind(this);
        this.save = this.save.bind(this);
        this.loadOptions = this.loadOptions.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    
    loadOptionData(){
        var mappingR = jQuery.ajax({
            method: 'GET',
            url: '/api/mapping/'+ this.props.params['mappingId'],
            contentType: "application/json; charset=utf-8"
        }),
        optionR = jQuery.ajax({
            method: 'GET',
            url: '/api/mapping/'+ this.props.params['mappingId']+ '/option/'+ this.props.params['_id'],
            contentType: "application/json; charset=utf-8"
        });
        jQuery.when(mappingR, optionR)
        .then( (mappingData, optionData ) =>{
            if( mappingData[0].status == true){
                this.setState({
                    mapping: mappingData[0].mapping
                })
                this.loadOptions(mappingData[0].mapping, optionData[0])
            }
        });
    }
    
    loadOptions(mapping, optionData){
        var sysaidOptionsR = jQuery.ajax({
            method: 'GET',
            url: `/api/sysaid/field/${mapping.sysaidField}/option`,
            contentType: "application/json; charset=utf-8"
        }),
        jiraOptionsR = jQuery.ajax({
            method: 'GET',
            url: `/api/jira/field/${mapping.jiraField}/option`,
            contentType: "application/json; charset=utf-8"
        }); 
        jQuery.when(sysaidOptionsR, jiraOptionsR)
        .then( ( sysaidOptionsData, jiraOptionsData ) =>{
            if( sysaidOptionsData[0].status == true && jiraOptionsData[0].status == true){
                this.setState({
                    sysaidOptions: sysaidOptionsData[0].options,
                    jiraOptions: jiraOptionsData[0].options
                })
            }else{
                console.log(`SysAid Field Error: ${sysaidOptionsData[0].error}, Jira Feild Error: ${sysaidOptionsData[0].error}`)
                /*this.setState({
                    sysaidOptions:  [
                        {"id":"1","caption":"bug"},
                        {"id":"2","caption":"Task"},
                        {"id":"3","caption":"Story"}
                    ],
                    jiraOptions: [
                        {"id": 1,"value": "Error"},
                        {"id": 2,"value": "Tarea"},
                        {"id": 3, "value": "Historia"}
                    ]
                })*/
            }
            if( optionData.status == true){
                this.refs.sysaidOption.value = optionData.option.sysaidOption;
                this.refs.jiraOption.value = optionData.option.jiraOption;
            }
        });
    }

    cancel(){
        browserHistory.push('/mappings/'+ this.props.params['mappingId'] + '/options')
    }
    
    save(evt){
        var url = '/api/mapping/' + this.props.params['mappingId'] + '/option',
            method = 'POST';
        if( this.props.params['_id'] != '0' ){
            url += '/' + this.props.params['_id'];
            method = 'PUT';
        }
        var option = {
            sysaidOption: this.refs.sysaidOption.value,
            jiraOption: this.refs.jiraOption.value
        };
        
        jQuery.ajax({
            method: method
            , url: url
            , contentType: "application/json; charset=utf-8"
            , data: JSON.stringify( option )
        }).then( (response, status) =>{
            if(status == 'success'){
                if( response.status == true){
                    alert(response.message)
                    browserHistory.push('/mappings/' + this.props.params['mappingId'] + '/options')
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
        this.loadOptionData();
    }

    render(){        
        return (
            React.createElement('div', { className: 'col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2'}, 
                React.createElement('h2', {}, 'Create Option'),
                React.createElement('form', {onSubmit: this.save }, 
                    React.createElement('div', { className: 'form-group'},
                        React.createElement('label', { }, 'Mapping'),
                        React.createElement('br',{} ),
                        React.createElement('h3', { }, 
                            React.createElement('span', {className: 'label label-sm label-success'}, this.state.mapping.name) 
                        )
                    ),
                    React.createElement('div', { className: 'form-group padding-bottom-15'},
                        React.createElement('div', { className: 'col-lg-6 col-md-6 col-sd-6 no-padding-left form-group'},
                            React.createElement('label', { }, 'Sysaid Option'),
                            React.createElement('select', {ref: 'sysaidOption', className: 'form-control', required: true},
                                React.createElement('option', { value: '0', disabled: true}, 'Select a option'),
                                this.state.sysaidOptions.map( ( sysaidOption ) =>{
                                    return React.createElement('option', { key: sysaidOption.id, value: sysaidOption.id}, sysaidOption.caption)
                                })
                            )
                        ),
                        React.createElement('div', { className: 'col-lg-6 col-md-6 col-sd-6 no-padding-right form-group'},
                            React.createElement('label', { }, 'Jira Key'),
                            React.createElement('select', { ref: 'jiraOption', className: 'form-control', required: true},
                                React.createElement('option', { value: '0', disabled: true}, 'Select a option'),
                                this.state.jiraOptions.map( ( jiraOption ) =>{
                                    return React.createElement('option', { key: jiraOption.id, value: jiraOption.id}, jiraOption.value || jiraOption.name)
                                })
                            )
                        )
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