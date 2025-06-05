/**
 * Class to manage cookies in the browser.
 * Provides methods to set, get, and remove cookies.
 * Cookies are stored as key-value pairs with an optional expiration time.
 */
export default class CookieManager {

    /**
     * Method to set a cookie in the browser.
     * @param name: string - The name of the cookie.
     * @param value: string - The value of the cookie. 
     * @param days: number - The number of days until the cookie expires. Default is 7 days.
     */
    static set(name: string, value: string, days: number = 7) : void {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
    }

  /**
   * Method to get a cookie by its name.
   * If the cookie does not exist, it returns null.
   * @param name 
   * @returns string | null - The value of the cookie if it exists, otherwise null.
   */
  static get(name: string): string | null {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [key, val] = cookie.split("=");
      if (decodeURIComponent(key) === name) {
        return decodeURIComponent(val);
      }
    }
    return null;
  }

  /**
   * Method to remove a cookie by its name.
   * It sets the cookie's expiration date to a past date.
   * @param name 
   */
  static remove(name: string) {
    document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}