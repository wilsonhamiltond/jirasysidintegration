import React from 'react'
import jQuery from 'jquery'
import { Link } from 'react-router'

export class ServiceSync extends React.Component{
    constructor(){
        super()
        this.state = {
            mappings: [],
            selectedMappings: [],
            type: ''
        }
        
        this.loadData = this.loadData.bind(this);
        this.save = this.save.bind(this);
        this.addMapping = this.addMapping.bind(this);
    }

    save(){
        let service = {
            type: this.state.type,
            mappings: this.state.selectedMappings
        }

        jQuery.ajax({
            method: 'PUT'
            , url: '/api/service/' + this.state.type
            , contentType: "application/json; charset=utf-8"
            , data: JSON.stringify( service )
        }).then( (response, status) =>{
            if(status == 'success'){
                if( response.status == true){
                    alert(response.message)
                    this.loadData(this.state.type)
                }else{
                    alert( response.error )
                }
            }else{
                console.log( 'The sercices has error.' );
            }
        });
    }

    addMapping(evnt, mapping){
        var mappings = this.state.selectedMappings;
        if( evnt.target.checked){
            mappings.push(mapping);
        }else{
            mappings = mappings.filter( (m) =>{
                return m._id != mapping._id;
            })
        }
        this.setState({selectedMappings: mappings});
    }

    loadData(type){
        var mappingsR = jQuery.ajax({
            method: 'GET',
            url: '/api/mapping',
            contentType: "application/json; charset=utf-8"
        }),
            servicesR = jQuery.ajax({
            method: 'GET',
            url: '/api/service/' + type,
            contentType: "application/json; charset=utf-8"
        })
        jQuery.when(mappingsR, servicesR).done( (mappingsData, servicesData ) =>{
            if( mappingsData[0].status == true && servicesData[0].status == true ){
                this.setState({
                    mappings: mappingsData[0].mappings,
                    selectedMappings: servicesData[0].service.mappings
                })
            }
        });
    }

    componentDidMount() {
        this.setState({type: this.props.params['type']})
        this.loadData(this.props.params['type']);
    }
    componentWillReceiveProps(props){
        this.setState({type: props.params['type']});
        this.loadData(props.params['type']);
    }
    
    render(){
        return (
            React.createElement('div', {}, 
                React.createElement('h2', {}, 'Mapping List for ' + this.state.type ),
                React.createElement('div', { className: 'col-lg-12'},
                    <Link to='/home'>Back</Link>,
                    React.createElement('a', { onClick: ()=>{ this.save() }, className: 'btn btn-xs btn-success pull-right'},
                        React.createElement('i', {className: 'glyphicon glyphicon-floppy-disk'}),
                        ' Save'
                    )
                ),
                React.createElement('table', { className: 'table table-striped'},
                    React.createElement('thead', {},
                        React.createElement('tr', {},
                            React.createElement('th', {}, 'Select'),
                            React.createElement('th', {}, 'Name'),
                            React.createElement('th', {}, 'SysAid Key'),
                            React.createElement('th', {}, 'Jira Key')
                        )
                    ),
                    React.createElement( 'tbody', {},
                        this.state.mappings.map( (mapping)=>{
                            return React.createElement('tr', { key: mapping._id},
                                React.createElement('td', {}, 
                                    React.createElement('input', { checked: this.state.selectedMappings.some( (m) =>{
                                        return m._id == mapping._id;
                                    }), onChange: (evnt)=>{ this.addMapping(evnt, mapping)}, type: 'checkbox'})
                                ),
                                React.createElement('td', {}, mapping.name),
                                React.createElement('td', {}, mapping.sysaidField),
                                React.createElement('td', {}, mapping.jiraField)
                            )
                        })
                    )
                )
            )
        )
    }
}