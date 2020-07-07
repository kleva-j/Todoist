import React from 'react';
import { Helmet } from 'react-helmet';

export const SEOHeader = ({ pageTitle, pageDesc, currentURL }) => {
  const url = process.env.PUBLIC_URL + currentURL;
  return (
    <Helmet>
      <title>{pageTitle} | Taskaider</title>
      
      <meta httpEquiv="X-UA-Compatible" content="IE-edge" />
      {/* <meta httpEquiv="Content-Security-Policy" content="script-src 'self'" /> */}
      
      <meta property="og:title" content={pageTitle} key="ogtitle" />
      <meta property="og:description" content={pageDesc} key="ogdesc" />
      <meta property="og:url" content={url} key="ogurl" />
    </Helmet>
  );  
};
