import { props } from 'types';

const View = ({ children }: props) => {
    return (
        <div className="grid h-full grid-rows-[auto_minmax(0,_1fr)] overflow-auto">
            {children}
        </div>
    );
};

export default View;