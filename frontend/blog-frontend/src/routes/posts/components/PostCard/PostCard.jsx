import './PostCard.css'
const PostCard = ({ title, content }) => {

    return <>
        <div className="card">
            <div className="card-body">
                <h3>{title}</h3>
                <h3>{content}</h3>
            </div>
        </div>

    </>
}

export default PostCard;