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
    try{ 
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

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();

    } catch (error) {
        console.error('Error in requestGet:', error);
        throw new RequestError(
            error instanceof Response ? error.status : 500,
            error instanceof Error && (error as any).data?.detail ? (error as any).data.detail : 'Erro no servidor'
        )
    }
}

export async function requestPost(
    url: string,
    body: any,
    token?: string
): Promise<any> {
    try {
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

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();

    } catch (error) {
        console.error('Error in requestPost:', error);
        throw new RequestError(
            error instanceof Response ? error.status : 500,
            error instanceof Error && (error as any).data?.detail ? (error as any).data.detail : 'Erro no servidor'
        )
    }
}

export async function requestDelete(
    url: string,
    token?: string
): Promise<any> {
    try {
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

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();

    } catch (error) {
        console.error('Error in requestDelete:', error);
        throw new RequestError(
            error instanceof Response ? error.status : 500,
            error instanceof Error && (error as any).data?.detail ? (error as any).data.detail : 'Erro no servidor'
        )
    }
}

export async function requestPut(
    url: string,
    body: any,
    token?: string
): Promise<any> {
    try {
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

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();

    } catch (error) {
        console.error('Error in requestPut:', error);
        throw new RequestError(
            error instanceof Response ? error.status : 500,
            error instanceof Error && (error as any).data?.detail ? (error as any).data.detail : 'Erro no servidor'
        )
    }
}