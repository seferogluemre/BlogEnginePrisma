import axios from "axios";

const baseUrl = "http://localhost:3000"

export async function postDetailLoader({ params }) {
    const response = await axios.get(`${baseUrl}/posts/${params.postId}`)
    return { post: response.data, comments: response.data.post_comments };
}