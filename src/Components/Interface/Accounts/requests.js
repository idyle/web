const servicePath = `${process.env.REACT_APP_BASEPATH}/auth`;

export const createSession = async (token) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
        const req = await fetch(`${servicePath}/tokens`, options);
        const res = await req.json();
        if (!res?.status) return false;
        return res?.session;
    } catch (e) {
        console.error(e);
        return false;
    }
};
