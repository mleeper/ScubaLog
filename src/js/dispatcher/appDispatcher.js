import flux          from 'flux';
import appStore      from '../stores/appStore';
import appConstants  from '../constants/appConstants';

var AppDispatcher = new flux.Dispatcher();

AppDispatcher.handleAction = function handleAction ( action ){
  this.dispatch( {
    source: 'VIEW_ACTION',
    action: action
  } );
};

AppDispatcher.register( function registerAppDispatcher ( payload ){
  var action = payload.action;
 
  switch(action.actionType){

    case appConstants.ADD_ROW:
      appStore.addRow( action.data );
      appStore.emit( appConstants.CHANGE_EVENT );
      break;
    case appConstants.UPDATE_ROW:
      appStore.updateRow( action.data );
      appStore.emit( appConstants.CHANGE_EVENT );
      break;
    case appConstants.DELETE_ROW:
      appStore.deleteRow( action.data );
      appStore.emit( appConstants.CHANGE_EVENT );
    default:
      return true;
  }
});

module.exports = AppDispatcher;