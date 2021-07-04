import React from 'react';
import ContentLoader from 'react-content-loader';


function LoadingBlock() {
    return (
        <ContentLoader 
          className="pizza-block"
          speed={2}
          width={280}
          height={460}
          viewBox="0 0 280 460"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="258" rx="6" ry="6" width="280" height="26" /> 
          <rect x="1" y="296" rx="6" ry="6" width="280" height="84" /> 
          <rect x="107" y="273" rx="0" ry="0" width="1" height="6" /> 
          <rect x="108" y="266" rx="0" ry="0" width="1" height="7" /> 
          <rect x="3" y="401" rx="6" ry="6" width="91" height="31" /> 
          <rect x="140" y="396" rx="25" ry="25" width="140" height="45" /> 
          <circle cx="137" cy="120" r="118" />
        </ContentLoader>
      );
    
}

export default LoadingBlock;
