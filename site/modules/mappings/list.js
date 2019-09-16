import React from 'react'
import { Link, browserHistory } from 'react-router'
import jQuery from 'jquery'

export class MappingList extends React.Component{
    
    constructor(){
        super()
        this.state = {
            mappings: []
        }
        
        this.loadData = this.loadData.bind(this);
        this.delete = this.delete.bind(this)
    }
    
    loadData(){
        var mappingsR = jQuery.ajax({
            method: 'GET',
            url: '/api/mapping',
            contentType: "application/json; charset=utf-8"
        })
        jQuery.when(mappingsR).done( (mappingsData ) =>{
            if( mappingsData.status == true){
                this.setState({
                    mappings: mappingsData.mappings
                })
            }
        });
    }
    
    edit(_id){
        browserHistory.push('/mappings/' + _id);
    }

    options(_id){
        browserHistory.push('/mappings/' + _id + '/options');
    }

    delete(mapping){
        jQuery.ajax({
            method: 'DELETE'
            , url: '/api/mapping'
            , contentType: "application/json; charset=utf-8"
            , data: JSON.stringify( mapping )
        }).then( (response, status) =>{
            if(status == 'success'){
                if( response.status == true){
                    alert(response.message)
                    this.loadData();
                }else{
                    alert(response.error)
                }
            }else{
                console.log('Error on service');
            }
        });
    }
    
    componentDidMount() {
        this.loadData();
    }
    render(){
        return (
            React.createElement('div', {}, 
                React.createElement('h2', {}, 'Mapping List'),
                React.createElement('div', { className: 'col-lg-12 text-right'},
                    React.createElement('a', { onClick: ()=>{ this.edit(0)}, className: 'btn btn-xs btn-success pull-right'},
                        React.createElement('i', {className: 'glyphicon glyphicon-plus'}),
                        ' Add'
                    )
                ),
                React.createElement('table', { className: 'table table-striped'},
                    React.createElement('thead', {},
                        React.createElement('tr', {},
                            React.createElement('th', {}, 'Name'),
                            React.createElement('th', {}, 'SysAid Key'),
                            React.createElement('th', {}, 'Jira Key'),
                            React.createElement('th', {}, 'Jira Property'),
                            React.createElement('th', {}, 'Options'),
                            React.createElement('th', {}, 'Action')
                        )
                    ),
                    React.createElement( 'tbody', {},
                        this.state.mappings.map( (mapping)=>{
                            return React.createElement('tr', { key: mapping._id},
                                React.createElement('td', {}, mapping.name),
                                React.createElement('td', {}, mapping.sysaidField),
                                React.createElement('td', {}, mapping.jiraField),
                                React.createElement('td', {}, mapping.jiraProperty),
                                React.createElement('td', {}, 
                                    React.createElement('a', { onClick: ()=>{ this.options(mapping._id)}, className: ''}, 'View')
                                ),
                                React.createElement('td', {}, 
                                    React.createElement('a', { onClick: ()=>{ this.edit(mapping._id)}, className: 'btn btn-xs btn-warning margin-right-15'},
                                        React.createElement('i', {className: 'glyphicon glyphicon-pencil'}),
                                        ' Edit'
                                    ), 
                                    React.createElement('a', {onClick: ()=>{ this.delete(mapping)}, className: 'btn btn-xs btn-danger'}, 
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