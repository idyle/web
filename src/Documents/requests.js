const servicePath = `${process.env.REACT_APP_BASEPATH}/documents`;

export const setDoc = async (token, doc) => {
    try {

        const { id, ...newDoc } = doc;

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ object: newDoc })
        };

        const req = await fetch(`${servicePath}/set/user/${id}?merge=true`, options);
        const res = await req.json();
        return res?.status;

    } catch (e) {
        console.error(e);
        return false;
    }
};

export const listDocs = async (token) => {
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
        if (!res?.status) return [];
        return res?.list;

    } catch (e) {
        console.error(e);
        return false;
    }
};

export const removeDoc = async (token, docId) => {
    try {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${servicePath}/delete/user/${docId}`, options);
        const res = await req.json();
        return res?.status;

    } catch (e) {
        console.error(e);
        return false;
    }
};