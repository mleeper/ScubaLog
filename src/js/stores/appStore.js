import events        from 'events';
import appConstants  from '../constants/appConstants';

// TODO: get data from service call.
var _store = [
	{ id: 0, location: 'Belize - Ambergris Key', time: '40 min', depth: '75ft', mixture: 'Regular', description: 'Really cool dive around Ambrigris Key.  We saw plenty of lion fish and nurse shark.', editMode: false},
	{ id: 1, location: 'Monterey - Monestery Beach', time: '60 min', depth: '50ft', mixture: 'Regular', description: 'Beautifully cold water.  Played with dolphins and seals.', editMode: false},
	{ id: 2, location: 'Belize - Ambergris Key', time: '70 min', depth: '35ft', mixture: 'Regular', description: 'Eagle Ray!!', editMode: false},
	{ id: 3, location: 'Bahamas - Freeport', time: '40 min', depth: '40ft', mixture: 'Regular', description: 'Reef Shark and Baracuda!! Perfect day of warm water diving', editMode: false},
	{ id: 4, location: 'Yucatan, Mexico Cenote Dive', time: '60 min', depth: '50ft', mixture: 'Regular', description: 'The halocline was the coolest thing I\'ve ever seen', editMode: false},
];

function updateContent ( index, remove ) {
	_store = content;
}

var appStore = Object.assign( {}, events.EventEmitter.prototype, {
	addChangeListener: function appStoreCallback( cb ){
    	this.on( appConstants.CHANGE_EVENT, cb );
  	},
	removeChangeListener: function appStoreCallback ( cb ){
		this.removeListener( appConstants.CHANGE_EVENT, cb );
	},
	getContent: function getContent () {
		return _store;
	},
	addRow: function addRow ( data ) {
		_store.push( data.row );
	},
	updateRow: function updateRow ( data ) {
		_store[ data.index ] = Object.assign( _store[ data.index ], data.row );
	},
	deleteRow: function deleteRow( data ) {
		_store.splice( data.index, 1 );
	}
} );

module.exports = appStore;