const servicePath = `${process.env.REACT_APP_BASEPATH}/editor`;

export const getEditorData = async (token) => {    
    try {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        const url = `${servicePath}/data/user`;
        const req = await fetch(url, options);
        const res = await req.json();
        if (res?.status) return res?.editor;
        return res?.status;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const editEditorData = async (token, editor) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ editor })
        };
        const url = `${servicePath}/data/user`;
        const req = await fetch(url, options);
        const res = await req.json();
        return res?.status;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const createPage = async (token, page) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ page })
        };

        let url = `${servicePath}/pages/user`;
        const req = await fetch(url, options);
        const res = await req.json();
        if (res?.status) return res;
        return res?.status;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const editPage = async (token, page) => {
    try {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ page })
        };

        let url = `${servicePath}/pages/user/${page?.id}`;
        const req = await fetch(url, options);
        const res = await req.json();
        return res?.status
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const listPages = async (token, filter, value) => {
    try {

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        let url = `${servicePath}/pages/user`;
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
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${servicePath}/pages/user/${page?.id}`, options);
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
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${servicePath}/pages/user/${page?.id}`, options);
        const res = await req.json();
        return res?.status;

    } catch (e) {
        console.error(e);
        return false;
    }
};

export const convertPage = async (token, entryId, customPath, stringOutput) => {
    try {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        let url = `${servicePath}/convert/user/${entryId}`;
        if (customPath) url = `${url}?type=custom`;
        if (stringOutput && customPath) url = `${url}&output=string`
        else if (stringOutput) url = `${url}?output=string`;

        const req = await fetch(url, options);
        const res = await req.json();
        if (!res?.status) return false;
        if (stringOutput) return res;
        return res?.status;
    } catch (e) {
        console.error(e);
        return false;
    }
};

// in replacement of above func, batch convert pages 

export const convertPages = async (token, stringOutput) => {
    try {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        let url = `${servicePath}/batchconvert/user`;
        if (stringOutput) url = `${url}?output=string`

        const req = await fetch(url, options);
        const res = await req.json();
        if (!res?.status) return false;
        if (stringOutput) return res;
        return res?.status;
        // we just access the files in docs

    } catch (e) {
        console.error(e);
        return false;
    }
};