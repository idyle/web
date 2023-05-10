const servicePath = `${process.env.REACT_APP_BASEPATH}/objects`;

export const uploadFile = async (token, file) => {
    try {

        const form = new FormData();
        form.append('files', file);

        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: form
        };

        const req = await fetch(`${servicePath}/upload/user/${file.name}`, options);
        const res = await req.json();
        console.log('res', res);
        if (!res?.status) return false;
        return res?.file;

    } catch (e) {
        console.error(e);
        return false;
    }
};

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
        
        if (!res?.status) return [];
        return res?.list;

    } catch (e) {
        console.error(e);
        return false;
    }
};

export const downloadFile = async (token, fileName) => {
    try {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${servicePath}/download/user/${fileName}`, options);
        const res = await req.json();

        if (!res?.status) return false;
        return res.file;

    } catch (e) {
        console.error(e);
        return false;
    }
};

export const deleteFile = async (token, fileName) => {
    try {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${servicePath}/delete/user/${fileName}`, options);
        const res = await req.json();
        return res?.status;

    } catch (e) {
        console.error(e);
        return false;
    }
};

export const getFile = async (token, fileName) => {
    try {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${servicePath}/get/user/${fileName}`, options);
        const res = await req.json();
        if (!res?.status) return false;
        return res?.file;

    } catch (e) {
        console.error(e);
        return false;
    }
};