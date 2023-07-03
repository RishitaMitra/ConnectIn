import React from 'react';
import './Widgets.css';
import InfoIcon from '@mui/icons-material/Info';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function Widgets() {

    const newsarticle=(heading, subtitle)=>(
        <div className='widgets_article'>
            <div className='widgets_articleleft'>
                <FiberManualRecordIcon/>
            </div>
            <div className='widgets_articleright'>
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    );

  return (
    <div className='widgets'>
        <div className='widgets_header'>
            <h2>ConnectIn News</h2>
            <InfoIcon/>
        </div>
        {newsarticle("ReactJS new version is released", "Top news -9099 readers")}
        {newsarticle("Blockchain new version is released", "Top news -9099 readers")}
        {newsarticle("JAVA new version is released", "Top news -9099 readers")}
        {newsarticle("Python new version is released", "Top news -9099 readers")}
        {newsarticle("REDUX new version is released", "Top news -9099 readers")}
    </div>
  );
}

export default Widgets;