[![ci-badge]][ci] [![docs-badge][]][docs]

# weeb-sh

Weeb-SH is a Typescript Library which makes interacting with weeb.sh v2
simple.

### Installation
If using yarn,

```sh
$ yarn add weeb-sh --save
```

If using npm,

```sh
$ npm install weeb-sh --save
```

To use the library you need to obtain a WeebAPI token.

### Examples

Get an array of all the current types:

```typescript
import WeebSH from "weeb-sh";

const weebSh = new WeebSH(process.env.TOKEN);

(async () => {
  let response;

  try {
    response = await weebSh.getTypes();
  } catch(e) {
    // Handle error with request

    console.log(e);
    return;
  }
  // Do something with returned response

  console.log(response);
})();
```
Get an array of all the current tags:

```typescript
import WeebSH from "weeb-sh";

const weebSh = new WeebSH(process.env.TOKEN);

(async () => {
  let response;

  try {
    response = await weebSh.getTags()
  } catch(e) {
    // Handle error with request

    console.log(e);
    return;
  }
  //Do something with response

  console.log(response);
})();
```

Get info on an image by its ID:

```typescript
import WeebSH from "weeb-sh";

const weebSh = new WeebSH(process.env.TOKEN);

(async () => {
  let response;

  try {
    response = await weebSh.getImage(id)
  } catch(e) {
  // Handle error with request

   console.log(e);
   return;
  }
  // Do something with returned response

  console.log(response);
})();
```

Supplying all options:

```typescript
import WeebSH from "weeb-sh";

const weebSh = new WeebSH(process.env.TOKEN);

(async () => {
  let response;

  try {
    response = await weebSh.getRandom({
      type: "kiss",
      tags: "girl",
      nsfw: "true",
    });
  } catch(e) {
    // Handle error with request

    console.log(e);
    return;
  }
  // Do something with the returned response

  console.log(response);
})();

```

Image request options:

```typescript
const options = {
  type: string, // Image type
  tags: string, // Image tags, a list of tags seperated by commas
  nsfw: string, // false(no nsfw), true(nsfw and no-nsfw), only(only nsfw)
}
```

### License

This project is [licensed under ISC][license].

[license]: https://github.com/shinonome-cafe/weeb-sh.ts/blob/master/LICENSE
[ci]: https://travis-ci.org/shinonome-cafe/weeb-sh.ts
[ci-badge]: https://travis-ci.org/shinonome-cafe/weeb-sh.ts.svg?branch=master
[docs]: https://shinonome-cafe.github.io/weeb-sh.ts/
[docs-badge]: https://img.shields.io/badge/docs-online-5023dd.svg
