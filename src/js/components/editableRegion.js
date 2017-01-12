import React from 'react';

export default React.createClass( {
	_editableItem: function renderEditableItem () {
		return (
			<input id={"input-" + this.props.keyName + this.props.id } type="text" className="editable" value={this.props.value} onChange={this.props.changeEvent} />
		);
	},
	render: function renderEditableRegion () {
		return (
			<span>
				{ this.props.editMode ? this._editableItem() : this.props.value }
			</span>
		)
	}
} );

