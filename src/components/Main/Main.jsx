import './Main.css';
import Promo from '../Promo/Promo'
import AboutProject from '../AboutProject/AboutProject'

function Main(props) {

    return (
        <main className="content">
            <Promo />
            <AboutProject />
        </main>
    );
}

export default Main;
