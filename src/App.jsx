import Notifier from './Utilities/Notifier';
import Loader from './Utilities/Loader';
import Prompter from './Utilities/Prompter';
import Contexts from './Contexts/Contexts';
import Components from './Components/Components';
import Spinner from './Utilities/Spinner';

const App = () => {
    return (
        <Contexts>
            <div className='grid grid-rows-[auto_minmax(0,_1fr)] h-screen'>
                <Loader />
                <Components />
                <Notifier />
                <Prompter />
                <Spinner />
            </div>
        </Contexts>
    )
};

export default App;