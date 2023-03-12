import { AiOutlineCheck } from 'react-icons/ai';
import { cloneElement } from 'react';
import { useAuth } from '../Context';
import { useState, useEffect } from 'react';

const Plan = ({ plan, onClick, onCancel }) => {

    const editedIcon = cloneElement(plan?.icon, { color: "inherit", size: "40px" });

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
                {editedIcon}
                <h1 className="text-5xl">{plan?.name}</h1>
            </div>

            <h1 className="text-5xl">{plan?.gb} GB</h1>

            <div className="grid justify-items-center">
                <h1 className="text-5xl font-bold">${plan?.price}</h1>
                <h1 className="text-3xl">per month</h1>
            </div>

            <div className="grid">
                {
                    plan?.inclusions?.map((inclusion, i) => (
                        <div key={`in${i}`} className="flex items-center gap-2">
                            <AiOutlineCheck size="30px" />
                            <h1 className="text-2xl">{inclusion}</h1>
                        </div>
                    ))
                }
            </div>

            {
                user?.planType === plan?.id ? 
                <div className="grid w-full justify-items-center items-center">
                    <div id={plan?.id} className="grid grid-cols-[auto_minmax(0,_1fr)] w-full p-2 justify-items-center items-center bg-black text-white rounded-xl select-none">
                        <AiOutlineCheck size="30px" />
                        <h1 className="text-3xl">Selected Plan</h1>
                    </div>

                    <div className="flex gap-2 items-center">
                        <h1 className="text-2xl italic">Renews {subscription?.date} {subscription?.day}</h1>
                        <h1 onClick={onCancel} className="text-2xl italic font-bold">Cancel?</h1>

                    </div>
                </div>
                :
                <div id={plan?.id} onClick={onClick} className="grid w-full p-2 items-center justify-items-center border border-black hover:bg-black hover:text-white rounded-xl select-none">
                    <h1 className="text-3xl">Select Plan</h1>
                </div>
            }



        </div>

    )
};

export default Plan;
