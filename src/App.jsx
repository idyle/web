import Notifier from './Utilities/Notifier';
import Loader from './Utilities/Loader';
import Confirmer from './Utilities/Confirmer';
import Contexts from './Contexts/Contexts';
import Components from './Components/Components';
import Spinner from './Utilities/Spinner';
import Prompter from './Utilities/Prompter';
import Informer from './Utilities/Informer';

const App = () => {
    return (
        <Contexts>
            <div className='grid grid-rows-[minmax(0,_1fr)] h-screen'>

                <Components />
                <Notifier />
                <Informer />
                <Confirmer />
                <Prompter />
                <Spinner />
            </div>
        </Contexts>
    )
};

export default App;