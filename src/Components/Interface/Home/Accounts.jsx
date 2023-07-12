import { BsPersonCircle } from "react-icons/bs";
import { useAuth } from "../../../Contexts/Auth";

const Accounts = () => {

    const { user } = useAuth();

    return (
        <div className="flex items-center p-2 gap-3">
            {user?.picture ? <img className="w-[40px] h-[40px] rounded-full" src={user?.picture} /> : <BsPersonCircle size="40px" />}
            <h1 className="text-4xl font-bold">{user?.name || ''}</h1> 
        </div>
    )
};

export default Accounts;