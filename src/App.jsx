import Notifier from './Utilities/Notifier';
import Loader from './Utilities/Loader';
import Confirmer from './Utilities/Confirmer';
import Contexts from './Contexts/Contexts';
import Components from './Components/Components';
import Spinner from './Utilities/Spinner';
import Prompter from './Utilities/Prompter';

const App = () => {
    return (
        <Contexts>
            <div className='grid grid-rows-[auto_minmax(0,_1fr)] h-screen'>
                <Loader />
                <Components />
                <Notifier />
                <Confirmer />
                <Prompter />
                <Spinner />
            </div>
        </Contexts>
    )
};

export default App;