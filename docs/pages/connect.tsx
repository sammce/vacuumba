import Board from "components/Connect/Board";
import Header from "components/Header";
import Head from "next/head";

const Connect = () => {
  return (
    <>
      <Head>
        <title>Connect 4</title>
      </Head>
      <Header />
      <Board />
    </>
  );
};

export default Connect;
