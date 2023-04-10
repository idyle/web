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

        const req = await fetch(`${servicePath}/save/user/${page?.route}`, options);
        const res = await req.json();
        console.log('set res', res);
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
        console.log('res pages', res);
        if (!res?.status) return false;
        return res?.pages;
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

        const req = await fetch(`${servicePath}/delete/user/${page?.route}`, options);
        const res = await req.json();
        console.log('delete res', res);
        return res?.status;

    } catch (e) {
        console.error(e);
        return false;
    }
};