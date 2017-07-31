import * as https from "https"

export interface Image {
  baseType: string
  fileType: string
  id: string
  mimeType: string
  nsfw: boolean
  tags: string[]
  type: string
  url: string
}

export interface Tags {
  types: string[]
}

export interface TagParams {
  nsfw?: string
  tags: string
  type?: string
}

export interface Types {
  types: string[]
}

export interface TypeParams {
  nsfw?: string
  tags?: string
  type: string
}

export type UrlParams = TypeParams | TagParams

// noinspection JSUnusedGlobalSymbols
export default class WeebAPI {
  private baseURL: string = "staging-api.ram.moe"
  // noinspection JSUnusedGlobalSymbols
  /**
   * Initialize the WeebAPI class
   *
   * Usage
   *
   * ```js
   *  import WeebAPI from 'weeb-api';
   *
   *  const weebClient = new WeebAPI('key');
   * ```
   *
   * @param {string} key WeebAPI authentication key
   */
  constructor(private key: string) {}

  // noinspection JSUnusedGlobalSymbols
  /**
   * Get an array of all the current types
   *
   * ```js
   *  let response;
   *
   *  try {
   *    response = await weebClient.getTypes()
   *  } catch(e) {
   *    // Handle error
   *  }
   * ```
   *
   * @returns {Promise<Object[]>} Array of current types
   */
  getTypes(): Promise<Types> {
    return this.request("/images/types")
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Get an array of all the current tags
   *
   * ```js
   *  let response;
   *
   *  try {
   *    response = await weebClient.getTags()
   *  } catch(e) {
   *    // Handle error
   *  }
   * ```
   *
   * @returns {Promise<Object[]>} Array of current tags
   */
  getTags(): Promise<Tags> {
    return this.request("/images/tags")
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Get info on an image using its ID
   *
   * ```js
   *  let response;
   *
   *  try {
   *    response = await weebClient.getImage(id)
   *  } catch(e) {
   *    // Handle error
   *  }
   * ```
   *
   * @param {string} id Image id
   * @returns {Promise<Object>} Image info object
   */
  getImage(id: string): Promise<Image> {
    return this.request("/images/info/" + id)
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Get a random image using the passed options, both type and tags are optional
   * but one of either must always be supplied. `nsfw` does not need to be supplied
   * and will default to false.
   *
   * Options explanation
   *
   * ```js
   *  const options = {
   *    type: string, // Image type
   *    tags: string, // Image tags, a list of tags seperated by commas
   *    nsfw: string, // false(no nsfw), true(nsfw and no-nsfw), only(only nsfw)
   *  }
   * ```
   *
   * Leaving out image tags
   *
   * ```js
   *  let response;
   *
   *  try {
   *    response = await weebClient.getRandom({
   *      type: 'hug',
   *      nsfw: 'only',
   *    });
   *  } catch(e) {
   *    // Handle error
   *  }
   * ```
   *
   * Leaving out image type
   *
   * ```js
   *  let response;
   *
   *  try {
   *    response = await weebClient.getRandom({
   *      tags: 'girl,cute',
   *      nsfw: 'only',
   *    });
   *  } catch(e) {
   *    // Handle error
   *  }
   * ```
   *
   * Supplying all options
   *
   * ```js
   *  let response;
   *
   *  try {
   *    response = await weebClient.getRandom({
   *      type: 'kiss',
   *      tags: 'girl',
   *      nsfw: 'true',
   *    });
   *  } catch(e) {
   *    // Handle error
   *  }
   * ```
   *
   * @param {UrlParams} options Image request options
   * @returns {Promise<Object>} Image data
   */
  getRandom(options: UrlParams): Promise<Image> {
    const parsedOptions = Object.entries(options)
      .map(([key, value]) => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(value)
      })
      .join("&")

    return this.request("/images/random?" + parsedOptions)
  }

  /**
   * Make a GET request to WeebAPI with the passed URL
   *
   * @param {string} url
   * @returns {Promise<Object | void>}
   */
  request(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      https
        .get(
          {
            hostname: this.baseURL,
            path: url,
            headers: {
              Authorization: this.key
            }
          },
          res => {
            let output: string = ""

            res.on("data", chunk => {
              output += chunk
            })

            res.on("end", () => {
              resolve(JSON.parse(output))
            })
          }
        )
        .on("error", err => {
          reject(err)
        })
    })
  }
}
