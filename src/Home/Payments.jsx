import { useAuth } from "../Contexts/Auth";
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import plans from '../Payments/plans';

const Payments = () => {

    const { user } = useAuth();

    const day = user?.planEnd && new Date(user?.planEnd * 1000).toLocaleString('default', { month: 'long' });
    const date = user?.planEnd && new Date(user?.planEnd * 1000).getDate();
    const plan = user?.planType && plans?.find(({ id }) => id === user?.planType)?.name;

    return (
        <div className="grid h-full items-center justify-items-center p-2">
            <div className="grid items-center justify-items-center">
            <div className="flex items-center gap-2">
                { plan ? <AiOutlineCheck size="30px" /> : <AiOutlineClose size="30px" /> }
                { plan ? <h1 className="text-4xl text-center font-bold">{plan} Plan</h1>  : <h1 className="text-4xl">No Plan Selected</h1> }
            </div> 
            { (date && day) && <h1 className="text-4xl text-center italic">Renews {date} {day}</h1> }
            </div>

        </div>
    )
};

export default Payments;