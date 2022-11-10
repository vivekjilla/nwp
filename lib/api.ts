import { container } from './cosmos'
async function fetchAPI(postId = '') {
  const url = process.env.WORDPRESS_API_URL
  if (postId) {
    url + "/" + postId
  }
  const res = await fetch(url)

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json
}

export async function getPost(id) {
  const data = await fetchAPI(id)
  return data
}

export async function getAllPosts() {
  const data = await fetchAPI()
  return data?.posts
}

export async function getAllComments(blog_id: string) {
  try {
    const queryspec = {
      query: "SELECT * from c where c.blog_id = @blog_id",
      parameters: [{
        name: "@blog_id",
        value: blog_id
      }]
    };

    const { resources } = await container.items.query(queryspec).fetchAll();
    return resources.reverse();
  } catch (ex) {
    console.log(ex)
    return []
  }
}