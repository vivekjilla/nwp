import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { GetStaticPaths, GetServerSideProps } from 'next'
import Container from '../../components/container'
import Comment from '../../components/comment'
import PostBody from '../../components/post-body'
import MoreStories from '../../components/more-stories'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import Tags from '../../components/tags'
import { getAllPosts, getAllComments } from '../../lib/api'
import { CMS_NAME } from '../../lib/constants'

export default function Post({ post, posts, preview, comments }) {
  const router = useRouter()
  const morePosts = posts && posts.filter((p) => p.ID != post.ID)

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {post.title} | Next.js Blog Example with {CMS_NAME}
                </title>
                <meta
                  property="og:image"
                  content={post.featured_image?.sourceUrl}
                />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.featured_image}
                date={post.date}
                author={post.author}
                categories={post.categories}
              />
              <PostBody content={post.content} />
              <footer>
                {post.tags.length > 0 && <Tags tags={post.tags} />}
              </footer>
            </article>

            <SectionSeparator />
            <Comment init_comments={comments} />
            <SectionSeparator />
            {morePosts && morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </>
        )}
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getAllPosts()
  var post = data && data.filter(p => decodeURIComponent(p.slug) == params?.slug);
  var comments = []
  if (post && post.length > 0) {
    comments = await getAllComments(post[0].slug)
  }
  return {
    props: {
      preview: false,
      post: post && post[0],
      posts: data,
      comments: comments,
    }
  }
}
