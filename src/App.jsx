import Notifier from './Utilities/Notifier';
import Loader from './Utilities/Loader';
import Prompter from './Utilities/Prompter';
import Contexts from './Contexts/Contexts';
import Components from './Components';

const App = () => {
    return (
        <Contexts>
            <div className='h-screen grid grid-rows-[auto_minmax(0,_1fr)]'>
                <Loader />
                <Components />
                <Notifier />
                <Prompter />
            </div>
        </Contexts>
    )
};

export default App;