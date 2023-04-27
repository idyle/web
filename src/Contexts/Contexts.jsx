import AuthContext from './Auth.jsx';
import DataContext from './Data.jsx';
import UtilContext from './Util.jsx';

const Contexts = ({ children }) => {
    return (
        <UtilContext>
            <AuthContext>
                <DataContext>
                    {children}
                </DataContext>
            </AuthContext>
        </UtilContext>
    )
};

export default Contexts;                