import Head from "next/head";
import Layout from "./Layout";

interface MetaProps {
  title: string;
}

const Meta = ({ title }: MetaProps) => {
  const MetaComponent: React.FC = ({ children }) => {
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <Layout>{children}</Layout>
      </>
    );
  };

  return MetaComponent;
};

export default Meta;
