import { Helmet } from "react-helmet";
import { useAuth, useUtil } from "../Context";
import { MdGroups, MdDomain, MdBusinessCenter  } from 'react-icons/md';
import Plan from './Plan';
import { useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { cancelPlan, confirmCheckout, getCheckout } from "./requests";
import { getAuth } from "firebase/auth";

const Payments = () => {

    const plans = [
        {
            id: 'price_1MbGbIBVlu9NzRVaiTJI7P1U',
            name: 'Standard',
            icon: <MdGroups />,
            gb: 30,
            price: 4.99,
            inclusions: [
                "idyle Platform & API",
                "idyle Network & CDN",
                "Basic Request Quota",
                "Basic Data Quota",
                "1 Custom Domain + SSL"
            ]
        },
        {
            id: 'sd',
            name: 'Business',
            icon: <MdBusinessCenter />,
            gb: 50,
            price: 7.99,
            inclusions: [
                "idyle Platform & API",
                "idyle Network & CDN",
                "Premium Request Quota",
                "Basic Data Quota",
                "2 Custom Domains + SSL"
            ]
        },
        {
            id: 'sadas',
            name: 'Enterprise',
            icon: <MdDomain />,
            gb: 100,
            price: 9.99,
            inclusions: [
                "idyle Platform & API",
                "idyle Network & CDN",
                "Premium Request Quota",
                "Premium Data Quota",
                "5 Custom Domains + SSL"
            ]
        }
    ];

    const { user } = useAuth();
    const { setLoader, setNotifier } = useUtil();

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
        if (user?.planType) return setNotifier('To select another plan, cancel the one you have.'); 
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
            </Helmet>

            <div className="grid gap-1 justify-items-center rounded-lg">
                <h1 className="text-6xl">{user?.displayName || ''}, choose a plan for You</h1>

            </div>

            <div className="grid grid-cols-3 gap-x-10 px-44 auto-rows-min overflow-auto">
                {plans.map((plan, i) => (<Plan key={`p${i}`} onCancel={onCancel} plan={plan} onClick={onClick} />))}
            </div>

        </div>
    )
};

export default Payments;