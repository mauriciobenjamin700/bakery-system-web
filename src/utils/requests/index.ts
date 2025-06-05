import RequestError from "@/types/error";

/**
 * Async function to make a GET request to a specified URL.
 * @param url 
 * @param token 
 * @returns JSON response from the server.
 * @throws RequestError if the request fails or the response is not ok.
 */
export async function requestGet(
    url: string,
    token?: string
): Promise<any> {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: headers,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new RequestError(
            response.status,
            data.detail || 'Erro no servidor'
        );
    }

    return data;
}

export async function requestPost(
    url: string,
    body: any,
    token?: string
): Promise<any> {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
    });

    const data = await response.json();

    console.log("Response DATA: ", data);

    if (!response.ok) {
        console.log("ERROR: ", response);
        throw new RequestError(
            response.status,
            data.detail || 'Erro no servidor'
        );
    }

    return data;
}

export async function requestDelete(
    url: string,
    token?: string
): Promise<any> {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        method: 'DELETE',
        headers: headers,
    });

    const data = await response.json();

    if (!response.ok) {
        
        throw new RequestError(
            response.status,
            data.detail || 'Erro no servidor'
        );
    }

    return data;
}

export async function requestPut(
    url: string,
    body: any,
    token?: string
): Promise<any> {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
            throw new RequestError(
                response.status,
                data.detail || 'Erro no servidor'
            );
        }

    return data;

}