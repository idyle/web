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
        console.log('res', res);
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
        console.log('res', res);
        if (!res?.status) return false;
        return res;

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
        console.log('deploy', res);
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

export const convertDoc = async (token, path, customPath) => {
    try {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        let url = `${servicePath}/convert/${path}`;
        if (customPath) url = `${url}?source=${customPath}`;

        const req = await fetch(url, options);
        const res = await req.json();
        if (!res?.status) return false;
        return res?.status;

    } catch (e) {
        console.error(e);
        return false;
    }
};