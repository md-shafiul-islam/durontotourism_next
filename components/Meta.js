/* eslint-disable @next/next/no-page-custom-font */
import React from "react";
import Head from "next/head";

/**
 *
 * @param {@Sting title, metaName, metaContent, favicon} params
 * @returns
 */

const Meta = (params) => {
  return (
    <Head>      
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{params.title ? params.title : "Duronto Trip"}</title>
      <meta name={`${params.metaName}`} content={params.metaContent} />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="icon"
        href={params.favicon ? params.favicon : "/favicon.ico"}
      />
    </Head>
  );
};

export default Meta;
