import { BsPersonCircle } from "react-icons/bs";
import { useAuth } from "../Contexts/Auth";

const Accounts = () => {

    const { user } = useAuth();

    return (
        <div className="flex h-full items-center p-2 gap-1">
            {user?.photoURL ? <img className="w-[40px] h-[40px] rounded-full" src={user?.photoURL} /> : <BsPersonCircle size="40px" />}
            {user?.displayName && <h1 className="text-4xl text-white">{user?.displayName}</h1> }
        </div>
    )
};

export default Accounts;