import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate();
    return <>
        <div className="container my-5 py-3">
            <div className="row text-center p-3">
                <h3 onClick={() => navigate('/posts')}>Gönderileri görüntüle</h3>
            </div>
        </div>
    </>
}
export default Home