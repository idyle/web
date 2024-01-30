import { props } from 'types';

const App = ({ children }: props) => {
    return (
        <div className="grid grid-rows-[minmax(0,_1fr)] h-[100dvh] bg-white overflow-auto">
            {children}
        </div>
    );
};

export default App;