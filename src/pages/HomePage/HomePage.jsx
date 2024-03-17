import "./HomePage.style.css";
import furryPawIcon from "../../icons/furry paw care.png";

const HomePage = () => {
    return (
        <div className="home-page">
             <img src={furryPawIcon} alt="Furry Paw Vet Icon" />
            <h1>Welcome to Furry Paw Vet</h1>
            <p>This is a sample home page.</p>
        </div>
    )
}

export default HomePage;
