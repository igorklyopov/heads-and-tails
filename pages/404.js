import Head from 'next/head';

import Container from '../components/Container/Container';

const notFoundTitleStyles = {
  margin: '30% auto',
  fontSize: '32px',
  textAlign: 'center',
};

const PageNotFound = () => {
  return (
    <>
      <Head>
        <title>Page not found</title>
        <meta name="description" content="Page not found" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <Container>
          <h1 style={notFoundTitleStyles}>404 Page Not Found</h1>
        </Container>
      </section>
    </>
  );
};
export default PageNotFound;
