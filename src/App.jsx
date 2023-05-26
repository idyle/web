import Notifier from './Utilities/Notifier';
import Loader from './Utilities/Loader';
import Prompter from './Utilities/Prompter';
import Contexts from './Contexts/Contexts';
import Components from './Components';
import ga from 'react-ga4';

ga.initialize(process.env.REACT_APP_GA_ID);

const App = () => {
    return (
        <Contexts>
            <div className='grid grid-rows-[auto_minmax(0,_1fr)]'>
                <Loader />
                <Components />
                <Notifier />
                <Prompter />
            </div>
        </Contexts>
    )
};

export default App;