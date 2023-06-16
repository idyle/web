import { BsPersonCircle } from "react-icons/bs";
import { useAuth } from "../../../Contexts/Auth";

const Accounts = () => {

    const { user } = useAuth();

    return (
        <div className="flex items-center p-2 gap-3">
            {(user?.photoURL || user?.picture) ? <img className="w-[40px] h-[40px] rounded-full" src={user?.photoURL || user?.picture} /> : <BsPersonCircle size="40px" />}
            {(user?.displayName || user?.name) && <h1 className="text-4xl font-bold">{user?.displayName || user?.name}</h1> }
        </div>
    )
};

export default Accounts;