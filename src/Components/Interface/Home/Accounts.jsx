import { BsPersonCircle } from "react-icons/bs";
import { useAuth } from "../../../Contexts/Auth";

const Accounts = () => {

    const { user } = useAuth();

    return (
        <div className="flex items-center p-2 gap-3">
            {user?.photoURL ? <img className="w-[40px] h-[40px] rounded-full" src={user?.photoURL} /> : <BsPersonCircle size="40px" />}
            {user?.displayName && <h1 className="text-4xl font-bold">{user?.displayName}</h1> }
        </div>
    )
};

export default Accounts;