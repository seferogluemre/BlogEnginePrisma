import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import './PostDetail.css'
const PostDetail = () => {

    const { post, comments } = useLoaderData();

    const [loading, setLoading] = useState(false);

    return <>
        <div className="container my-3">
            <div className="row d-flex justify-content-center py-3">

                <div className="col-lg-8 d-flex justify-content-center">
                    {
                        <div className="col-lg-3" >
                            <div className="card-detail text-center">
                                <h2 className="fs-5">{post.title}</h2>
                                <p className="text-light text-black fs-6">{post.content}</p>
                            </div>
                        </div>
                    }
                </div>

                <div className="col-lg-8">
                    <Tabs defaultActiveKey="comments" id="controlled-tab-example" className="mb-3">
                        <Tab eventKey="comments" title="Yorumlar">
                            {loading ? (
                                <Spinner animation="border" variant="primary" />
                            ) : (
                                <ul className="list-unstyled p-2">
                                    {comments?.map((comment) => (
                                        <li id="comment-card" key={comment.id}>
                                            <h4>{comment.commenter_name}</h4>
                                            <p>{comment.content}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    </>
}

export default PostDetail;