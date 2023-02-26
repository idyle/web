
const servicePath = `${process.env.REACT_APP_BASEPATH}/objects`;

export const listFiles = async (token) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${servicePath}/list/user`, options);
        const res = await req.json();
        console.log(res);

    } catch (e) {
        console.error(e);
        return [];
    }
};