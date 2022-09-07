async function fetchAPI(postId = '') {
  const url = "https://public-api.wordpress.com/rest/v1.1/sites/adityadotdev.wordpress.com/posts"
  if (postId){
    url+"/"+postId
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
