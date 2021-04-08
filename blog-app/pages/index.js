import Head from 'next/head'
import Container from '../components/Container';
import apiRequest from '../utils/api';
import Link from 'next/link';

export default function Home({ posts, pages }) {
  return (
    <Container>
      <Head>
        <title>Next Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Im the pages</h1>
        <ul>
          {pages.map(page => {
            return (
              <li key={page.id}>
                <Link href={`/${page.slug}`}>
                  {page.Title}
                </Link>
              </li>
            )
          })}
        </ul>
        <h1>Im a blog</h1>
        <ul>
          {posts.map(post => {
            return (
              <li key={post.id}>
                <Link href={`/blog/${post.Slug}`}>
                  {post.Title}
                </Link>
              </li>
            )
          })}
        </ul>
      </main>
    </Container>
  )
}

export async function getStaticProps() {
  const blogPosts = await apiRequest.get('/blogs');
  const pages = await apiRequest.get('/pages');

  return {
    props: {
      posts: blogPosts.data,
      pages: pages.data
    }
  }
}
