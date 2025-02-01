import Head from "next/head";

export default function templatePageHOC(components, templatePageHOCProps = {}) {
  return function WrappedComponent(props) {
    console.log("Props:", props);
    return (
      <>
        <Head>
          <title>
            {templatePageHOCProps?.title
              ? `${templatePageHOCProps.title} | ${props.site?.title}`
              : `${props.site?.title}`}
          </title>
        </Head>
      </>
    );
  };
}
