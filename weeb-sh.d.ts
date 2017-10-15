export interface Image {
    /**
     * Id of the account that uploaded the image
     */
    account: string;
    /**
     * The base type of the image
     */
    baseType: string;
    /**
     * The file type of the returned image
     */
    fileType: string;
    /**
     * Whether the image is private to the uploader
     */
    hidden: boolean;
    /**
     * The image id
     */
    id: string;
    /**
     * Mime type of the image
     */
    mimeType: string;
    /**
     * Whether the image is nsfw or not(true or false)
     */
    nsfw: boolean;
    /**
     * The tags of the image
     */
    tags: ImageTag[];
    /**
     * The type of the image returned
     */
    type: string;
    /**
     * The Url which can be used to access the image
     */
    url: string;
}
export interface ImageTag {
    /**
     * Whether the tag is private and only available to its creator
     */
    hidden: boolean;
    /**
     * Name of the tag
     */
    name: string;
    /**
     * Id of the account that created the tag
     */
    user: string;
}
export interface TagParams {
    hidden?: boolean;
    /**
     * Whether the returned image can be nsfw or not; available options are true,
     * false or only.
     */
    nsfw?: string;
    /**
     * The tags in which you want the returned image to match.
     */
    tags: string;
    /**
     * The type of the image you'd like returned.
     */
    type?: string;
}
export interface Types {
    /**
     * Array of all possible types
     */
    types: string[];
}
export interface TypeParams {
    hidden?: boolean;
    /**
     * Whether the returned image can be nsfw or not; available options are true,
     * false or only.
     */
    nsfw?: string;
    /**
     * The tags in which you want the returned image to match.
     */
    tags?: string;
    /**
     * The type of the image you'd like returned.
     */
    type: string;
}
export declare enum TokenType {
    Bearer = 0,
    Wolke = 1,
}
export declare type UrlParams = TypeParams | TagParams;
export default class WeebSH {
    private tokenType;
    private baseURL;
    private token;
    /**
     * Create a new WeebSH instance using your authentication key.
     *
     * ### Examples
     *
     * Create a new WeebSH instance using the obtained authentication token:
     *
     * ~~~
     * import WeebSH from 'weeb-sh';
     *
     * const weebSh = new WeebSH(process.env.TOKEN);
     * ~~~
     *
     * If using WolkeTokens
     *
     * ~~~
     * import WeebSH, { TokenType } from 'weeb-sh'
     *
     * const weebSh = new WeebSH(process.env.WOLKE_TOKEN, TokenType.Wolke)
     * ~~~
     *
     * @param {string} token WeebSH authentication token
     * @param {number} tokenType Token type, as specified by the TokenType enum
     * @public
     */
    constructor(token: string, tokenType?: TokenType | undefined);
    /**
     * Returns an array containing all the current types in the API.
     *
     * ### Examples
     *
     * Get an array of all the current types:
     *
     * ~~~
     * import WeebSH from 'weeb-sh';
     *
     * const weebSh = new WeebSH(process.env.TOKEN);
     *
     * let response;
     *
     * try {
     *   response = await weebSh.getTypes();
     * } catch(e) {
     *   // Handle error
     * }
     * ~~~
     *
     * @param {boolean} [hidden] Whether to include hidden image types
     * @returns {Promise<Types[]>} Array of current image types
     * @public
     */
    getTypes(hidden?: boolean): Promise<Types>;
    /**
     * Returns an array containing all the current tags in the API.
     *
     * ### Examples
     *
     * Get an array of all the current tags:
     *
     * ~~~
     * import WeebSH from 'weeb-sh';
     *
     * const weebSh = new WeebSH(process.env.TOKEN);
     *
     * let response;
     *
     * try {
     *   response = await weebSh.getTags();
     * } catch(e) {
     *   // Handle error
     * }
     * ~~~
     *
     * @param {boolean} hidden Whether to include hidden image tags
     * @returns {Promise<ImageTag[]>} Array of current tags
     * @public
     */
    getTags(hidden?: boolean): Promise<ImageTag[]>;
    /**
     * Get info on an image using its ID.
     *
     * ### Examples
     *
     * ~~~
     * import WeebSH from 'weeb-sh';
     *
     * const weebSh = new WeebSH(process.env.TOKEN);
     *
     * let response;
     *
     * try {
     *   response = await weebSh.getImage(id);
     * } catch(e) {
     *   // Handle error
     * }
     * ~~~
     *
     * @param {string} id The id of the image
     * @returns {Promise<Image>} Image info object
     * @public
     */
    getImage(id: string): Promise<Image>;
    /**
     * Get a random image using the passed options, both type and tags are
     * optional but one of either must always be supplied. `nsfw` does not need to
     * be supplied and will default to false.
     *
     * ### Examples
     *
     * Leaving out image tags:
     *
     * ~~~
     * import WeebSH from 'weeb-sh';
     *
     * const weebSh = new WeebSH(process.env.TOKEN);
     *
     * let response;
     *
     * try {
     *   response = await weebSh.getRandom({
     *     type: 'hug',
     *     nsfw: 'only',
     *   });
     * } catch(e) {
     *   // Handle error
     * }
     * ~~~
     *
     * Leaving out image type:
     *
     * ~~~
     * import WeebSH from 'weeb-sh';
     *
     * const weebSh = new WeebSH(process.env.TOKEN);
     *
     * let response;
     *
     * try {
     *   response = await weebSh.getRandom({
     *     hidden: true,
     *     nsfw: 'only',
     *     tags: 'girl,cute',
     *   });
     * } catch(e) {
     *   // Handle error
     * }
     * ~~~
     *
     * Supplying all options:
     *
     * ~~~
     * import WeebSH from 'weeb-sh';
     *
     * const weebSh = new WeebSH(process.env.TOKEN);
     *
     * let response;
     *
     * try {
     *   response = await weebSh.getRandom({
     *     hidden: false,
     *     nsfw: 'true',
     *     tags: 'girl',
     *     type: 'kiss',
     *   });
     * } catch(e) {
     *   // Handle error
     * }
     * ~~~
     *
     * Image request options:
     *
     * ~~~
     * const options = {
     *   hidden: string, // Return an image that is private to you or not
     *   nsfw: string, // false(no nsfw), true(nsfw and no-nsfw), only(only nsfw)
     *   tags: string, // Image tags, a list of tags seperated by commas
     *   type: string, // Image type
     * }
     * ~~~
     *
     * @param {UrlParams} options Image request options
     * @returns {Promise<Image>} Image data
     * @public
     */
    getRandom(options: UrlParams): Promise<Image>;
    private request(url, params?);
}
