/*import React from 'react'
import './Inputoption.css';

function Inputoption({Icon, title, color, handleAction}) {
  return (
    <div className='inputoption' onClick={handleAction}>
        <Icon style={{ color: color}}/>
        <h4>{title}</h4>
        </div>
  )
}

export default Inputoption;*/

//import React from 'react';
import React from 'react';
import './Inputoption.css';

const Inputoption = ({ Icon, title, color, onClick }) => {
  

  return (
    <div className="inputoption" onClick={onClick}>
      <Icon style={{ color: color }} />
      <h4>{title}</h4>
    </div>
  );
};

export default Inputoption;
