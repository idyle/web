const servicePath = `${process.env.REACT_APP_BASEPATH}/deployer`;

export const setupWebsite = async (token, website) => {
    try {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${servicePath}/setup/${website}`, options);
        const res = await req.json();
        return res?.status;

    } catch (e) {
        console.error(e);
        return false;
    }
};

export const getWebsite = async (token) => {
    try {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${servicePath}/get`, options);
        const res = await req.json();
        if (!res?.status) return false;
        return res?.website;

    } catch (e) {
        console.error(e);
        return false;
    }
};

export const deployWebsite = async (token, website, files, revertDeployId) => {
    try {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ files })
        };

        let url = `${servicePath}/deploy/${website}`;
        if (revertDeployId) url = `${url}?revert=${revertDeployId}`;

        const req = await fetch(url, options);
        const res = await req.json();
        if (!res?.status) return false;
        return res;

    } catch (e) {
        console.error(e);
        return false;
    }
};


export const listDeploys = async (token, filter, value) => {
    try {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        let url = `${servicePath}/list`;
        if (filter && value) url = `${url}?filter=${filter}&value=${value}`;

        const req = await fetch(url, options);
        const res = await req.json();
        if (!res?.status) return false;
        return res?.list;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const connectDomain = async (token, domain) => {
    try {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        let url = `${servicePath}/connect/${domain}`;
        const req = await fetch(url, options);
        const res = await req.json();
        if (!res?.status) return false;
        return res?.status;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const disconnectDomain = async (token) => {
    try {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        let url = `${servicePath}/disconnect`;
        const req = await fetch(url, options);
        const res = await req.json();
        if (!res?.status) return false;
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

        let url = `${process.env.REACT_APP_BASEPATH}/editor/convert/user/${entryId}`;
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

        let url = `${process.env.REACT_APP_BASEPATH}/editor/batchconvert/user`;
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