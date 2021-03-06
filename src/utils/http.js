export async function post (url, body) {
    const headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type':     'application/json',
        'Accept':           'application/json',
    };
    return await fetch(
        url,
        {
            method: 'post',
            credentials: 'same-origin',
            redirect: 'manual',
            headers: headers,
            body: JSON.stringify(body)
        }
    );
}

export async function get (url) {
    const headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type':     'application/json',
        'Accept':           'application/json',
    };
    const response = await fetch(
        url,
        {
            method: 'get',
            credentials: 'same-origin',
            redirect: 'manual',
            headers: headers,
        }
    );
    return await response.json();
}
