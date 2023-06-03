import { AiOutlineCheck } from 'react-icons/ai';
import { cloneElement } from 'react';
import { useAuth } from "../../../Contexts/Auth";
import { useState, useEffect } from 'react';

const Plan = ({ plan, onClick, onCancel }) => {

    // const editedIcon = cloneElement(plan?.icon, { color: "inherit", size: "40px" });

    const { user } = useAuth();

    const getSubscription = () => {
        if (!user?.planEnd || !user?.planType) return;
        const day = new Date(user?.planEnd * 1000).toLocaleString('default', { month: 'long' });
        const date = new Date(user?.planEnd * 1000).getDate();
        return { day, date }
    };

    const [subscription, setSubscription] = useState(() => getSubscription());
    useEffect(() => setSubscription(getSubscription()), [user]);

    return (
        <div id={plan?.id} className="grid rounded-xl gap-10 p-5 justify-items-center border border-black select-none">

            <div className="grid justify-items-center">
                {/* {editedIcon} */}
                <h1 className="text-4xl break-all text-center">{plan?.name}</h1>
            </div>

            <h1 className="text-5xl text-center">{plan?.gb} GB</h1>

            <div className="grid justify-items-center">
                <h1 className="text-5xl font-bold text-center">${plan?.price}</h1>
                <h1 className="text-3xl text-center">per month</h1>
            </div>

            <div className="grid">
                {
                    plan?.inclusions?.map((inclusion, i) => (
                        <div key={`in${i}`} className="flex items-center gap-2">
                            <AiOutlineCheck size="30px" />
                            <h1 className="text-2xl text-center">{inclusion}</h1>
                        </div>
                    ))
                }
            </div>

            {
                user?.planType === plan?.id ? 
                <div className="grid w-full justify-items-center items-center">
                    <div id={plan?.id} className="grid grid-cols-[auto_minmax(0,_1fr)] w-full p-2 justify-items-center items-center bg-black text-white rounded-xl select-none">
                        <AiOutlineCheck size="30px" />
                        <h1 className="text-3xl text-center">Selected Plan</h1>
                    </div>


                    <div className="grid justify-items-center items-center">
                        <h1 className="text-2xl  text-center">Renews {subscription?.date} {subscription?.day}</h1>
                        <h1 onClick={onCancel} className="text-2xl italic font-bold text-center hover:text-gray-500">Cancel your subscription?</h1>
                    </div>
                </div>
                :
                <>
                {
                    plan?.active ?
                <div id={plan?.id} onClick={onClick} className="grid w-full p-1 items-center justify-items-center border border-black hover:bg-black hover:text-white rounded-xl select-none">
                    <h1 className="text-3xl text-center">Select Plan</h1>
                </div> 
                :
                <div id={plan?.id} className="grid w-full p-1 items-center justify-items-center border border-black rounded-xl select-none bg-gray-100">
                    <h1 className="text-3xl text-center">Coming Soon</h1>
                </div> 
                }
                </>
                
            }



        </div>

    )
};

export default Plan;
