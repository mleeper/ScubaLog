import React           from 'react';
import ReactDOM        from 'react-dom';
import DiveTable       from './src/js/components/diveTable';
import diveLog         from './src/js/data/diveLog';

var App = React.createClass({
  render: function(){
    return (
      <div id="main-container" className="columns">
        <div id="content" className="main-content">
          <DiveTable />
        </div>
        
      </div>
    )
  }
});

ReactDOM.render(
	<App />,
	document.getElementById( 'mount-point' )
);
