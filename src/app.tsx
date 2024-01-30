import { BrowserRouter } from "react-router-dom";
import Context from "context";
import { AppScreen, Utils } from 'components';
import AppRouter from "routes";

const App = () => {
    return (
        <BrowserRouter>
            <Context>
                <AppScreen>
                    <AppRouter />
                    <Utils />
                </AppScreen>
            </Context>
        </BrowserRouter>
    );

};

export default App;