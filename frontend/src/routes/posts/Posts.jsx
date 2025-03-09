import { useLoaderData, useNavigate } from "react-router-dom";
import PostCard from './components/PostCard/PostCard'
const Posts = () => {

    const { posts } = useLoaderData();
    const navigate = useNavigate();

    return <>
        <div className="container my-3">
            <div className="row d-flex justify-content-center">
                {
                    posts.map((post) => (
                        <div className="col-lg-3" onClick={() => navigate("/posts/" + post.id)}>
                            <PostCard content={post.content} key={post.id} title={post.title} />
                        </div>
                    ))
                }
            </div>
        </div>
    </>
}

export default Posts;