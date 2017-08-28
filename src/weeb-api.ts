import * as https from "https";

export interface Image {
  /**
   * The base type of the image
   */
  baseType: string;
  /**
   * The file type of the returned image
   */
  fileType: string;
  /**
   * The image id
   */
  id: string;
  mimeType: string;
  /**
   * Whether the image is nsfw or not(true or false)
   */
  nsfw: boolean;
  /**
   * The tags of the image
   */
  tags: string[];
  /**
   * The type of the image returned
   */
  type: string;
  /**
   * The Url which can be used to access the image
   */
  url: string;
}

export interface Tags {
  /**
   * Array of all possible tags
   */
  types: string[];
}

export interface TagParams {
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
  private baseURL: string = "https://staging.weeb.sh";
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
   * @returns {Promise<Object[]>} Array of current types
   * @public
   */
  public getTypes(): Promise<Types> {
    return this.request("/images/types");
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
   * @returns {Promise<Object[]>} Array of current tags
   * @public
   */
  public getTags(): Promise<Tags> {
    return this.request("/images/tags");
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
   * @param {string} id Image id
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
   *  const options = {
   *    type: string, // Image type
   *    tags: string, // Image tags, a list of tags seperated by commas
   *    nsfw: string, // false(no nsfw), true(nsfw and no-nsfw), only(only nsfw)
   *  }
   * ~~~
   *
   * @param {UrlParams} options Image request options
   * @returns {Promise<Object>} Image data
   * @public
   */
  public getRandom(options: UrlParams): Promise<Image> {
    const parsedOptions = Object.entries(options).map(([key, value]) => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(value)
      }).join("&");

    return this.request("/images/random?" + parsedOptions);
  }

  /*
   * Make a GET request to WeebAPI with the passed URL
   *
   * @param {string} url
   * @returns {Promise<Object | void>}
   * @private
   */
  private request(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      https.get({
        hostname: this.baseURL,
        path: url,
        headers: {
          Authorization: this.token,
        }
      }, res => {
        let output: string;

        res.on("data", chunk => {
          output += chunk
        }).on("end", () => {
          resolve(JSON.parse(output))
        });
      })
        .on("error", err => {
          reject(err);
        });
    })
  }
}
