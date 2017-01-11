import React      from 'react';
import appStore   from '../stores/appStore';
import appActions from '../actions/appActions';

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
	_editableItem: function renderEditableItem ( key, id, index ) {
		return (
			<input id={"input-" + key + id } type="text" className="editable" value={this.state.content[ index ][ key ]} onChange={this._changeEvent.call( this, index, key )} />
		);
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
					          			<a id={'edit-row-'   + item.id} href="javascript:void(0)" className="edit-row" onClick={this._editRowHandler.bind( null, index, 'location' )}><i className="pencil-icon"></i></a>
					          		</td>
					          		<td className="data-column-location" data-header="Location">				         
					          			{ item.editMode ? this._editableItem( 'location', item.id, index ) : item.location }
					          		</td>
					          		<td className="data-column-time" data-header="Dive Time">
					          			{ item.editMode ? this._editableItem( 'time', item.id, index ) : item.time }
					          		</td>
					          		<td className="data-column-depth" data-header="Depth">
					          			{ item.editMode ? this._editableItem( 'depth', item.id, index ) : item.depth }
					          		</td>
					          		<td className="data-column-mixture" data-header="mixture">
					          			{ item.editMode ? this._editableItem( 'mixture', item.id, index ) : item.mixture }
					          		</td>
					          		<td className="data-column-description" data-header="description">
					          			{ item.editMode ? this._editableItem( 'description', item.id, index ) : item.description }
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