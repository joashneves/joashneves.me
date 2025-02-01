import Head from "next/head";
import { TemplateConfigProvider } from "./TemplateConfigContext";
import { Component } from "react";


export default function templatePageHOC(
  components,
  templatePageHOCProps = {}
) {
  return function WrappedComponent(props) {
    console.log(props)
    return (
      <>
        <Head>
          <title>
            {templatePageHOCProps?.title ?
              `${templatePageHOCProps.title} | ${props.site?.title}`
              : `${props.site?.title}`}
          </title>
        </Head>
      </>
    )
  }
}
