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

        const req = await fetch(`${servicePath}/files/user/${file.name}`, options);
        const res = await req.json();
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
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${servicePath}/folders/user`, options);
        const res = await req.json();
        if (!res?.status) return false;
        return res?.list;

    } catch (e) {
        console.error(e);
        return false;
    }
};

export const downloadFile = async (token, fileName) => {
    try {

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${servicePath}/files/user/${fileName}?type=download`, options);
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
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${servicePath}/files/user/${fileName}`, options);
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
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${servicePath}/files/user/${fileName}`, options);
        const res = await req.json();
        if (!res?.status) return false;
        return res?.file;

    } catch (e) {
        console.error(e);
        return false;
    }
};

export const publicFile = async (token, fileName) => {
    try {

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${servicePath}/files/user/${fileName}`, options);
        const res = await req.json();
        return res?.status
    } catch (e) {
        console.error(e);
        return false;
    }
};