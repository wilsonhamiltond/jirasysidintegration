import React from 'react'
import { Link, browserHistory } from 'react-router'
import jQuery from 'jquery'

export class OptionList extends React.Component{
    
    constructor(){
        super()
        this.state = {
            mapping: {},
            options: []
        }
        
        this.loadOptions = this.loadOptions.bind(this);
        this.delete = this.delete.bind(this)
        this.edit = this.edit.bind(this);
    }
    
    loadOptions(){
        var mappingR = jQuery.ajax({
            method: 'GET',
            url: '/api/mapping/'+ this.props.params['mappingId'],
            contentType: "application/json; charset=utf-8"
        }),
        optionsR = jQuery.ajax({
            method: 'GET',
            url: '/api/mapping/' + this.props.params['mappingId'] + '/option',
            contentType: "application/json; charset=utf-8"
        });
        jQuery.when(mappingR, optionsR)
        .done( (mappingData, optionsData) =>{
            if( optionsData[0].status == true && mappingData[0].status == true){
                this.setState({
                    options: optionsData[0].options,
                    mapping: mappingData[0].mapping
                })
            }
        })
    }
    
    edit(_id){
        browserHistory.push('/mappings/' + this.props.params['mappingId'] + '/options/' + _id);
    }

    delete(option){
        jQuery.ajax({
            method: 'DELETE'
            , url: '/api/mapping/' + this.props.params['mappingId'] +'/option'
            , contentType: "application/json; charset=utf-8"
            , data: JSON.stringify( option )
        }).then( (response, status) =>{
            if(status == 'success'){
                if( response.status == true){
                    alert(response.message)
                    this.loadOptions();
                }else{
                    alert(response.error)
                }
            }else{
                console.log('Error on service');
            }
        });
    }
    
    componentDidMount() {
        this.loadOptions();
    }

    render(){
        return (
            React.createElement('div', {}, 
                React.createElement('h2', {}, 'Option List'),
                React.createElement('div', { className: 'col-lg-12'},
                    <Link to='/mappings'>Back</Link>,
                    React.createElement('a', { onClick: ()=>{ this.edit(0)}, className: 'btn btn-xs btn-success pull-right'},
                        React.createElement('i', {className: 'glyphicon glyphicon-plus'}),
                        ' Add'
                    )
                ),
                React.createElement('table', { className: 'table table-striped'},
                    React.createElement('thead', {},
                        React.createElement('tr', {},
                            React.createElement('th', {}, 'Mapping'),
                            React.createElement('th', {}, 'SysAid Option'),
                            React.createElement('th', {}, 'Jira Option'),
                            React.createElement('th', {}, 'Action')
                        )
                    ),
                    React.createElement( 'tbody', {},
                        this.state.options.map( (option)=>{
                            return React.createElement('tr', {key: option._id},
                                React.createElement('td', {}, this.state.mapping.name),
                                React.createElement('td', {}, option.sysaidOption),
                                React.createElement('td', {}, option.jiraOption),
                                React.createElement('td', {}, 
                                    React.createElement('a', { onClick: ()=>{ this.edit(option._id)}, className: 'btn btn-xs btn-warning margin-right-15'},
                                        React.createElement('i', {className: 'glyphicon glyphicon-pencil'}),
                                        ' Edit'
                                    ), 
                                    React.createElement('a', {onClick: ()=>{ this.delete(option)}, className: 'btn btn-xs btn-danger'},
                                        React.createElement('i', {className: 'glyphicon glyphicon-trash'}),
                                        ' Delete'
                                    )
                                )
                            )
                        })
                    )
                )
            )
        )
    }
}