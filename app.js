import React           from 'react';
import ReactDOM        from 'react-dom';
import DiveTable       from './src/js/components/diveTable';
import diveLog         from './src/js/data/diveLog';

var App = React.createClass( {
  render: function renderApp () {
    return (
      <div id="main-container" className="columns">
        <h1>Scuba Diving Log Book</h1>
        <div id="content" className="main-content">
          <DiveTable id="diveLog1"/>
        </div>
        
      </div>
    )
  }
});

ReactDOM.render(
	<App />,
	document.getElementById( 'mount-point' )
);
