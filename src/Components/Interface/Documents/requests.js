const servicePath = `${process.env.REACT_APP_BASEPATH}/documents`;

export const setDoc = async (token, doc) => {
    try {

        const { id, ...newDoc } = doc;

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ object: newDoc })
        };

        const req = await fetch(`${servicePath}/documents/user/${id}?merge=true`, options);
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
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${servicePath}/collections/user`, options);
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
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${servicePath}/documents/user/${docId}`, options);
        const res = await req.json();
        return res?.status;

    } catch (e) {
        console.error(e);
        return false;
    }
};