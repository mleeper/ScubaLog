module.exports = {
	'before' : function beforeTestsRun ( browser ) {
		browser
			.url( 'http://localhost:8000' )
			.pause( 500 );
	},

	'after' : function afterTestsRun ( browser ) {
		browser.end();
	},

	'Test if app is rendered' : function testifAppIsRendered( browser ) {
		browser.expect.element( '#main-container' ).to.be.present;
	},

	'Test if table is rendered' : function testIfTableIsRendered ( browser ) {
		browser.expect.element( '#dive-table-diveLog1' ).to.be.present;
	},

	'Test if clicking edit button toggles edit mode for only its row' : function testEditMode ( browser ) {
		browser.click( '#data-row-0 .edit-row', function editModeOnCallback () {
			browser.expect.element( '#data-row-0' ).to.have.attribute( 'class' ).which.contains( 'edit-mode' );
			browser.expect.element( '#data-row-1' ).to.have.attribute( 'class' ).which.does.not.contain( 'edit-mode' );
			browser.click( '#data-row-0 .edit-row', function editModeOffCallback () {
				browser.expect.element( '#data-row-0' ).to.have.attribute( 'class' ).which.does.not.contain( 'edit-mode' );
			} );
		} );
	},

	'Test if clicking edit button toggles edit mode creates input fields for only its row' : function testInputCreation ( browser ) {
		browser.click( '#data-row-0 .edit-row', function editModeOnCallback () {
			browser.expect.element( '#input-location0' ).to.be.visible;
			browser.expect.element( '#input-location1' ).to.not.be.present;
			browser.click( '#data-row-0 .edit-row', function editModeOffCallback () {
				browser.expect.element( '#input-location0' ).to.not.be.present;
			} );
		} );
	},

	'Test editing a row': function testRowEdit ( browser ) {
		var inputString = 'Monterey - Breakwater Cove Metridium Fields';
		browser.click( '#data-row-0 .edit-row', function testRowEditCallback () {
			browser.setValue( '#input-location0', inputString, function editModeSetValue() {
				browser.click( '#data-row-0 .edit-row', function editModeOffCallback () {
					browser.expect.element( '#data-row-0 .data-column-location' ).text.to.contain( inputString );
				} );
			} );
		} );
	},

	'Test deleting a row': function testRowDelete ( browser ) {
		browser.getText( '#data-row-0 .data-column-location', function getColumnText( result ) {
			browser.click( '#data-row-0 .delete-row', function testRowDeleteCallback () {
				browser.expect.element( '#data-row-0 .data-column-location' ).text.to.not.equal( result.value );
			} );
		} );
	},

	'Test adding a row': function testRowAdd ( browser ) {
		browser.getText( '.data-row:last-child .data-column-location', function getColumnText( result ) {
			browser.click( '#diveLog1-add-row', function testRowAddCallback () {
				browser.expect.element( '.data-row:last-child .data-column-location .editable' ).to.have.attribute( 'value' ).which.does.not.equal( result.value );
			} );
		} );
	}
};