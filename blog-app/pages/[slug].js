import Head from 'next/head'
import Container from '../components/Container';
import apiRequest from '../utils/api';
import RenderComponents from '../components/RenderComponents';
import Link from 'next/link';

export default function Page({ pageData }) {
  const { Title, Slice, ...rest } = pageData;

  return (
    <Container>
      <Head>
        <title>{Title}</title>
      </Head>
      <main>
        <Container>
          <h1>{Title}</h1>
          <RenderComponents components={Slice}/>
          <Link href={'/'}>Go back</Link>
        </Container>
      </main>
    </Container>
  )
}

export async function getStaticPaths() {
  const pageList = await apiRequest.get('/pages');

  return {
    paths: pageList.data.map(({ slug }) => ({ params: { slug: slug }})),
    fallback: false
  };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const page = await apiRequest.get(`pages?slug=${params.slug}`);
  const pageData = page?.data?.[0];

  if (!pageData) {
    return {
      notFound: true
    }
  }

  return { props: { pageData: pageData } }
}
