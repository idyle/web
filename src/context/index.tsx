import APIContext from "context/api";
import AuthContext from "context/auth";
import DataContext from "context/data";
import UtilsContext from "context/utils";
import { props } from 'types';

const Context = ({ children }: props) => {
    return (
        <UtilsContext>
            <AuthContext>
                <APIContext>
                    <DataContext>
                        {children}
                    </DataContext>
                </APIContext>
            </AuthContext>
        </UtilsContext>
    );
};

export default Context;