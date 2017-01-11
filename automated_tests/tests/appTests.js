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

	'Test if content compoent is rendered' : function testIfContentComponentIsRendered ( browser ) {
		browser.expect.element( '#content' ).to.be.present;
		browser.expect.element( '#content div' ).text.to.equal( 'New Content 1' ); 
	},

	'Test if nav menu component is rendered' : function testIfNavMenuComponentIsRendered ( browser ) {
		browser.expect.element( '#main-navigation-list' ).to.be.present;
	},

	'Test if clicking on nav menu link changes content in Content Component': function testIfNavMenuLinkChangesContent ( browser ) {
		browser.click( '#item2', function itemClickTestCallback () {
			browser.expect.element( '#content div' ).text.to.equal( 'Content2' );
		} ); 	
	}


};