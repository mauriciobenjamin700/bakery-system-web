import { requestPost, requestGet } from "@/utils/requests";
import { API_URL } from "@/constants";
import CookieManager from "@/utils/cookies";


export default class UserService {
    basePath: string;

    constructor() {
        this.basePath = `${API_URL}/user`;
    }

    async login(data: UserLogin) : Promise<TokenResponse> {
        const tokenResponse:TokenResponse = await requestPost(`${this.basePath}/login`, data);

        CookieManager.set('access_token', tokenResponse.access_token, 7);

        return tokenResponse;
    }

    async getUser(token: string) {
        return requestGet(`${this.basePath}/`, token);
    }
}