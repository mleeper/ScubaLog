import React      from 'react';
import Editable   from './editableRegion';
import appStore   from '../stores/appStore';
import appActions from '../actions/appActions';

const KEYS = {
	location: 'location',
	time: 'time',
	depth: 'depth',
	mixture: 'mixture',
	description: 'description'
};

// TODO: Add client side rollback feature using a stack
export default React.createClass( {
	getInitialState: function getInitialState () {
		return {
			content: appStore.getContent()
		};
	},
	_onChange: function onChange(){
		this.setState( {
		  content: appStore.getContent()
		} );
  	},
  	_changeEvent: function changeEvent( index, key ) {
  		var that = this;
  		return function inputChangeEvent( event ) {  			
  			var row = that.state.content;
  			row[ index ][ key ] = event.target.value;  			
  			appActions.updateRow( row, index );
  		}
  	},
  	componentDidMount: function diveTableDidMount() {
		appStore.addChangeListener( this._onChange );
	},
	componentWillUnmount: function diveTableWillUnmount(){
		appStore.removeChangeListener( this._onChange );
	},
	_addRowHandler: function addRowHandler () {
		appActions.addRow( {
			id: new Date().valueOf(),
			location: '',
			time: '',
			depth: '',
			mixture: '',
			description: '',
			editMode: true
		} );
	},
	_editRowHandler: function editRowHandler ( index, key ) {
		var row   = this.state.content;
		row[index].editMode = !row[index].editMode;
		appActions.updateRow( row, index );
	},
	_deleteRowHandler: function removeRowHandler ( index, editMode ) {
		// TODO: Fire a modal to confirm the deletetion
		if( !editMode ) {
			appActions.deleteRow( index );
		}
	},
	render: function renderDiveTable () {
		const items   = this.state.content;		
		return (
			<div id={this.props.id} className="dive-table">
				<div className="add-row-container"><a id={this.props.id  + '-add-row'} href="javascript:void(0)" className="add-row" onClick={this._addRowHandler}>+</a></div>			
				<table id={'dive-table-' + this.props.id}>
					<thead>
						<tr key="tableHeader">
							<th></th>
			          		<th>Location</th>
			          		<th>Dive Time</th>
			          		<th>Depth</th>
			          		<th>Gas Mixture</th>
			          		<th>Description</th>
			          	</tr>
			        </thead>
			        <tbody>
			        	{
			        		items.map( ( item, index ) =>
			        			<tr id={'data-row-' + index} className={item.editMode ? 'data-row edit-mode' : 'data-row'} key={index}>
					          		<td className="row-actions">
					          			<a id={'delete-row-' + item.id} href="javascript:void(0)" className={item.editMode ? 'delete-row disabled' : 'delete-row'} onClick={this._deleteRowHandler.bind( null, index, item.editMode )}>-</a>
					          			<a id={'edit-row-'   + item.id} href="javascript:void(0)" className="edit-row" onClick={this._editRowHandler.bind( null, index, KEYS.location )}><i className="pencil-icon"></i></a>
					          		</td>
					          		<td className="data-column-location" data-header="Location">				         
					          			<Editable keyName={KEYS.location} id={item.id} index={index} value={item.location} editMode={item.editMode} changeEvent={this._changeEvent.call( this, index, KEYS.location )} />
					          		</td>
					          		<td className="data-column-time" data-header="Dive Time">
					          			<Editable keyName={KEYS.time} id={item.id} index={index} value={item.time} editMode={item.editMode} changeEvent={this._changeEvent.call( this, index, KEYS.time )} />
					          		</td>
					          		<td className="data-column-depth" data-header="Depth">
					          			<Editable keyName={KEYS.depth} id={item.id} index={index} value={item.depth} editMode={item.editMode} changeEvent={this._changeEvent.call( this, index, KEYS.depth )} />
					          		</td>
					          		<td className="data-column-mixture" data-header="mixture">
					          			<Editable keyName={KEYS.mixture} id={item.id} index={index} value={item.mixture} editMode={item.editMode} changeEvent={this._changeEvent.call( this, index, KEYS.mixture )} />
					          		</td>
					          		<td className="data-column-description" data-header="description">
					          			<Editable keyName={KEYS.description} id={item.id} index={index} value={item.description} editMode={item.editMode} changeEvent={this._changeEvent.call( this, index, KEYS.description )} />
					          		</td>
					          	</tr>	

			        		)		        				        		
			        	}
			          	
			        </tbody>
		        </table>
	        </div>					 
		);
	},
} );