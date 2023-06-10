const servicePath = `${process.env.REACT_APP_BASEPATH}/payments`;

export const getCheckout = async (token, planId) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${servicePath}/checkout/${planId}`, options);
        const res = await req.json();

        if (!res?.status) return false;
        return res?.link;

    } catch (e) {
        console.error(e);
        return false;
    }
};

export const confirmCheckout = async (token, sessionId) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${servicePath}/confirm/${sessionId}`, options);
        const res = await req.json();
        
        return res?.status;

    } catch (e) {
        console.error(e);
        return false;
    }
};

export const cancelPlan = async (token, planId) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${servicePath}/cancel/${planId}`, options);
        const res = await req.json();
        
        return res?.status;
    } catch (e) {
        console.error(e);
        return false;
    }
}; 

export const getMetrics = async (token) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${servicePath}/metrics`, options);
        const res = await req.json();
        return res?.metrics;
    } catch (e) {
        console.error(e);
        return false;
    }
}; 