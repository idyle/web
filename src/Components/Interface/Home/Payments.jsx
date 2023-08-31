import { useAuth } from "../../../Contexts/Auth";
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import plans from '../Accounts/Payments/plans';

const Payments = () => {

    const { user } = useAuth();

    const day = user?.planEnd && new Date(user?.planEnd * 1000).toLocaleString('default', { month: 'long' });
    const date = user?.planEnd && new Date(user?.planEnd * 1000).getDate();
    const plan = user?.planType && plans?.find(({ id }) => id === user?.planType)?.name;

    return (
        <div className="grid h-full items-center justify-items-center p-2">
            <div className="grid items-center justify-items-center">
            <div className="flex items-center gap-2">
                { plan ? <AiFillCheckCircle size="40px" /> : <AiFillCloseCircle size="40px" /> }
                { plan ? <h1 className="text-5xl text-center font-bold">{plan} Plan</h1>  : <h1 className="text-4xl lg:text-5xl text-center">No Plan Selected</h1> }
            </div> 
            { (date && day) && <h1 className="text-4xl text-center italic">Renews {date} {day}</h1> }
            </div>

        </div>
    )
};

export default Payments;