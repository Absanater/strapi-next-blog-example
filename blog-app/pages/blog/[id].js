import Head from 'next/head'
import Container from '../../components/Container';
import apiRequest from '../../utils/api';
import api from '../../utils/api';
import lightFormat from 'date-fns/lightFormat';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import BlogComments from '../../components/BlogComments';

export default function BlogPost({ post }) {
  const { id, Title, Date: date, author, Hero, Content } = post;

  return (
    <Container>
      <Head>
        <title>{Title}</title>
      </Head>

      <main>
        <h1>{Title}</h1>
        <p>{author.Name} - {lightFormat(new Date(date), 'yyyy-MM-dd')}</p>
        <img src={process.env.NEXT_PUBLIC_BLOG_API + Hero.url} />
        <ReactMarkdown>
          {Content}
        </ReactMarkdown>
        <Link href={'/'}>Go back</Link>
        <BlogComments blogPage={id} />
      </main>
    </Container>
  )
}

export async function getStaticPaths() {
  const blogPosts = await apiRequest.get('/blogs');

  return {
    paths: blogPosts.data.map(({ Slug }) => ({ params: { id: Slug }})),
    fallback: false
  };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const post = await apiRequest.get(`blogs?Slug=${params.id}`);
  const blogPost = post?.data?.[0];

  if (!blogPost) {
    return {
      notFound: true
    }
  }

  return { props: { post: blogPost } }
}
