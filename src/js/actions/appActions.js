import AppDispatcher from '../dispatcher/appDispatcher';
import appConstants  from '../constants/appConstants';

module.exports = {
  addRow: function addRow ( row ) {
    AppDispatcher.handleAction( {
      actionType: appConstants.ADD_ROW,
      data: {       
        row: row        
      }
    } );
  },
  updateRow: function updateRow ( row, index ) {
    AppDispatcher.handleAction( {
      actionType: appConstants.UPDATE_ROW,      
      data: {
        index: index,
        row: row        
      }
    } );
  },
  deleteRow: function deleteRow ( index ) {
    AppDispatcher.handleAction( {
      actionType: appConstants.DELETE_ROW,
      data: {
        index: index,     
      }
    } );
  } 
};