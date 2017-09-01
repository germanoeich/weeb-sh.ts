import axios from 'axios';

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

export type UrlParams = TypeParams | TagParams;

// noinspection JSUnusedGlobalSymbols
export default class WeebAPI {
  private baseURL: string = "https://api.weeb.sh";
  // noinspection JSUnusedGlobalSymbols
  /**
   * Create a new WeebAPI instance using your authentication key.
   *
   * ### Examples
   *
   * Create a new WeebAPI instance using the obtained authentication token:
   *
   * ~~~
   * import WeebAPI from 'weeb-api';
   *
   * const weebApi = new WeebAPI(process.env.TOKEN);
   * ~~~
   *
   * @param {string} token WeebAPI authentication token
   * @public
   */
  public constructor(private token: string) { }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Returns an array containing all the current types in the API.
   *
   * ### Examples
   *
   * Get an array of all the current types:
   *
   * ~~~
   * import WeebAPI from 'weeb-api';
   *
   * const weebApi = new WeebAPI(process.env.TOKEN);
   *
   * let response;
   *
   * try {
   *   response = await weebApi.getTypes();
   * } catch(e) {
   *   // Handle error
   * }
   * ~~~
   *
   * @param {boolean} [hidden] Whether to include hidden image types
   * @returns {Promise<Object[]>} Array of current image types
   * @public
   */
  public getTypes(hidden?: boolean): Promise<Types> {
    return this.request("/images/types", { hidden: hidden });
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Returns an array containing all the current tags in the API.
   *
   * ### Examples
   *
   * Get an array of all the current tags:
   *
   * ~~~
   * import WeebAPI from 'weeb-api';
   *
   * const weebApi = new WeebAPI(process.env.TOKEN);
   *
   * let response;
   *
   * try {
   *   response = await weebApi.getTags();
   * } catch(e) {
   *   // Handle error
   * }
   * ~~~
   *
   * @param {boolean} [hidden] Whether to include hidden image tags
   * @returns {Promise<Object[]>} Array of current tags
   * @public
   */
  public getTags(hidden?: boolean): Promise<ImageTag[]> {
    return this.request("/images/tags", { hidden: hidden });
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Get info on an image using its ID.
   *
   * ### Examples
   *
   * ~~~
   * import WeebAPI from 'weeb-api';
   *
   * const weebApi = new WeebAPI(process.env.TOKEN);
   *
   * let response;
   *
   * try {
   *   response = await weebApi.getImage(id);
   * } catch(e) {
   *   // Handle error
   * }
   * ~~~
   *
   * @param {string} id The id of the image
   * @returns {Promise<Object>} Image info object
   * @public
   */
  public getImage(id: string): Promise<Image> {
    return this.request("/images/info/" + id);
  }

  // noinspection JSUnusedGlobalSymbols
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
   * import WeebAPI from 'weeb-api';
   *
   * const weebApi = new WeebAPI(process.env.TOKEN);
   *
   * let response;
   *
   * try {
   *   response = await weebApi.getRandom({
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
   * import WeebAPI from 'weeb-api';
   *
   * const weebApi = new WeebAPI(process.env.TOKEN);
   *
   * let response;
   *
   * try {
   *   response = await weebApi.getRandom({
   *     tags: 'girl,cute',
   *     nsfw: 'only',
   *   });
   * } catch(e) {
   *   // Handle error
   * }
   * ~~~
   *
   * Supplying all options:
   *
   * ~~~
   * import WeebAPI from 'weeb-api';
   *
   * const weebApi = new WeebAPI(process.env.TOKEN);
   *
   * let response;
   *
   * try {
   *   response = await weebApi.getRandom({
   *     type: 'kiss',
   *     tags: 'girl',
   *     nsfw: 'true',
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
   * @returns {Promise<Object>} Image data
   * @public
   */
  public getRandom(options: UrlParams): Promise<Image> {
    return this.request("/images/random", options);
  }

  /*
   * Make a GET request to WeebAPI with the passed URL
   *
   * @param {string} url
   * @param {object} [params]
   * @returns {Promise<Object | void>}
   * @private
   */
  private async request(url: string, params?: object): Promise<any> {
    let response;

    try {
      response = await axios({
        baseURL: this.baseURL,
        headers: {
          Authorization: "Bearer" + this.token,
          "Content-Type": "application/json",
        },
        method: "get",
        params,
        url,
      })
    } catch (e) {
      return Promise.reject(e);
    }

    console.log(response);

    return response;
  }
}
