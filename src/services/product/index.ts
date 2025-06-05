import { requestPost, requestGet, requestPut, requestDelete } from "@/utils/requests";
import { API_URL } from "@/constants";
import CookieManager from "@/utils/cookies";

/**
 * Service class for handling product-related operations.
 * Provides methods to add a product and get user information.
 */
export default class ProductService {
    basePath: string;

    constructor() {
        this.basePath = `${API_URL}/product`;
    }

    /**
     * Async method to add a new product.
     * @param data: ProductRequest - The product data to be added.
     * @returns: Promise<ProductResponse> - The response containing the added product details.
     */
    async addProduct(data: ProductRequest, token: string) : Promise<ProductResponse> {
        const response:ProductResponse = await requestPost(
            `${this.basePath}/`, 
            data, 
            token
        );
        return response;
    }

    async getProducts(token: string) {
        return requestGet(
            `${this.basePath}/`, 
            token
        );
    }
    async getProductById(id: string, token: string) {
        return requestGet(
            `${this.basePath}/?product_id${id}`, 
            token
        );
    }
    async updateProduct(id: string, data: ProductRequest, token: string) {
        return requestPut(
            `${this.basePath}/${id}`, 
            data, 
            token
        );
    }

    async deleteProduct(id: string, token: string) {
        return requestDelete(
            `${this.basePath}/${id}/`, 
            token
        );
    }
}