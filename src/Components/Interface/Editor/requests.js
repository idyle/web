const servicePath = `${process.env.REACT_APP_BASEPATH}/editor`;

export const savePage = async (token, page) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ page })
        };

        let url = `${servicePath}/save/user`;
        if (page?.id) url = `${url}/${page?.id}`;

        const req = await fetch(url, options);
        const res = await req.json();
        if (res?.status) return res;
        return res?.status;

    } catch (e) {
        console.error(e);
        return false;
    }
};

export const listPages = async (token, filter, value) => {
    try {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        let url = `${servicePath}/list/user`;
        if (filter && value) url = `${url}?filter=${filter}&value=${value}`;

        const req = await fetch(url, options);
        const res = await req.json();
        if (!res?.status) return false;
        return res?.pages;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const getPage = async (token, page) => {
    try {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${servicePath}/get/user/${page?.id}`, options);
        const res = await req.json();
        if (!res?.status) return false;
        return res?.page;

    } catch (e) {
        console.error(e);
        return false;
    }
};

export const deletePage = async (token, page) => {
    try {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${servicePath}/delete/user/${page?.id}`, options);
        const res = await req.json();
        return res?.status;

    } catch (e) {
        console.error(e);
        return false;
    }
};