import axios from "axios";

const baseUrl = "http://localhost:3000"

export async function postsLoader() {
    const response = await axios.get(`${baseUrl}/posts`)
    return { posts: response.data.data };
}