import Page from "./Page";

export default function ConnectedPage({ pageClass, children }) {
  return <Page pageClass={pageClass}>{children}</Page>;
}
