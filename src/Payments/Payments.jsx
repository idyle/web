import { Helmet } from "react-helmet";
import { useAuth } from "../Contexts/Auth";
import { useUtil } from "../Contexts/Util";
import { MdGroups, MdDomain, MdBusinessCenter  } from 'react-icons/md';
import Plan from './Plan';
import { useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { cancelPlan, confirmCheckout, getCheckout } from "./requests";
import { getAuth } from "firebase/auth";
import plans from './plans';

const Payments = () => {

   

    const { user } = useAuth();
    const { setLoader, notify } = useUtil();

    const [searchParams] = useSearchParams();

    useEffect(() => {
        const sessionId = searchParams?.get('session');
        if (!sessionId || !user) return;
        (async () => {
            setLoader(true);
            
            const { token } = await getAuth().currentUser.getIdTokenResult(true);
            const confirm = await confirmCheckout(token, sessionId);
            setLoader(false);
            if (!confirm) return;
            window.location.replace(`${window.location.origin}${window.location.pathname}`);
            // propagate to user
        })();
    }, [searchParams, user]);

    const onClick = async (e) => {
        const id = e.currentTarget.id;
        // where target id === planId
        if (user?.planType) return notify('To select another plan, cancel the one you have.'); 
        // if user already owns plan 
        if (!id) return;
        setLoader(true);
        const { token } = await getAuth().currentUser.getIdTokenResult(true);

        const link = await getCheckout(token, id);
        setLoader(false);
        if (!link) return;
        window.location.replace(link);
        // navigate to checkout
    };

    const onCancel = async () => {
        if (!user?.planId) return;
        const { token } = await getAuth().currentUser.getIdTokenResult(true);
        if (!token) return;
        setLoader(true);
        const operation = await cancelPlan(token, user?.planId);
        setLoader(false);
        if (!operation) return;
        window.location.reload();
    };

    
    return (
        <div className="grid grid-rows-[auto_minmax(0,_1fr)] m-5 gap-5">

            <Helmet>
                <title>idyle - Payments</title>
                <meta name="description" content="Payments" />
                <meta name="keywords" content="Payments" />
                <link rel="canonical" href="/payments" />
            </Helmet>

            <div className="grid gap-1 justify-items-center rounded-lg">
                <h1 className="text-6xl text-center">{user?.displayName || ''}, choose a plan for You</h1>

            </div>

            <div className="grid grid-cols-3 gap-x-5 p-3 auto-rows-min overflow-auto">
                {plans.map((plan, i) => (<Plan key={`p${i}`} onCancel={onCancel} plan={plan} onClick={onClick} />))}
            </div>

        </div>
    )
};

export default Payments;
