import { Helmet } from "react-helmet";
import { useAuth } from "../../../../Contexts/Auth";
import { useUtil } from "../../../../Contexts/Util";
import Plan from './Plan';
import { useEffect } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { cancelPlan, confirmCheckout, getCheckout } from "./requests";
import plans from './plans';
import { useData } from "../../../../Contexts/Data";

const Payments = () => {

    const { user, resetUser, getToken } = useAuth();
    const { spin, notify, confirm, inform } = useUtil();
    const { resetData, renewData } = useData();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const sessionId = searchParams?.get('session');
        if (!sessionId || !user) return;
        (async () => {
            spin(true);
            const token = await getToken();
            const confirm = await confirmCheckout(token, sessionId);
            spin(false);
            if (!confirm) return;
            await resetUser();
            await renewData();
            // window.location.replace(`${window.location.origin}${window.location.pathname}`);
            await inform("Welcome to idyle!", "A powerful journey awaits.");
            navigate('/');
            return notify('Take a look at all your data over here. Start building today!', 5000);   
            // propagate to user
        })();
    }, [searchParams, user]);

    const onClick = async (e) => {
        const id = e.currentTarget.id;
        // where target id === planId
        if (user?.planType) return notify('To select another plan, cancel the one you have.'); 
        // if user already owns plan 
        if (!id) return;
        spin(true);
        const token = await getToken();
        const link = await getCheckout(token, id);
        spin(false);
        if (!link) return;
        window.location.replace(link);
        // navigate to checkout
    };

    const onCancel = async () => {
        if (!user?.planId) return;
        if (!(await confirm('Are you sure you want to cancel your subscription? This action is permanent.'))) return;
        const token = await getToken();
        if (!token) return;
        spin(true);
        const operation = await cancelPlan(token, user?.planId);
        spin(false);
        if (!operation) return;
        resetData();
        resetUser();
        // window.location.reload();
    };

    
    return (
        <div className="grid grid-rows-[auto_minmax(0,_1fr)] gap-5 m-3">

            <Helmet>
                <title>idyle - Payments</title>
                <meta name="description" content="Payments" />
                <meta name="keywords" content="Payments" />
                <link rel="canonical" href="/payments" />
            </Helmet>

            <div className="grid gap-1 justify-items-center rounded-lg">
                <h1 className="text-5xl text-gunmetal font-bold md:text-6xl text-center">{user?.name || 'With idyle'}, there's a perfect plan for You.</h1>
            </div>

            <div className="grid md:grid-cols-3 gap-x-5 gap-y-2 p-3 auto-rows-min md:overflow-auto">
                {plans.map((plan, i) => (<Plan key={`p${i}`} onCancel={onCancel} plan={plan} onClick={onClick} />))}
            </div>

        </div>
    )
};

export default Payments;
