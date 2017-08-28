[![ci-badge]][ci] [![docs-badge][]][docs]
# weeb-api
Weeb-Api is a Typescript Library which makes interacting with WeebApi v2
simple and with 0 dependencies.
### Installation
If using yarn,
```sh
$ yarn add weeb-api --save
```
If using npm,
```sh
$ npm install weeb-api --save
```
To use the library you need to obtain a WeebAPI token.
### Examples  
Get an array of all the current types:
```typescript
import WeebAPI from "weeb-api";
 
const weebApi = new WeebAPI(process.env.TOKEN);
 
(async () => {
  let response;
   
  try {
    response = await weebClient.getTypes();
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
import WeebAPI from "weeb-api";
 
const weebApi = new WeebAPI(process.env.TOKEN);
 
(async () => {
  let response;
    
  try {
    response = await weebClient.getTags()
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
import WeebAPI from "weeb-api";
 
const weebApi = new WeebAPI(process.env.TOKEN);
 
(async () => {
  let response;
   
  try {
    response = await weebClient.getImage(id)
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
import WeebAPI from "weeb-api";

const weebApi = new WeebAPI(process.env.TOKEN);

(async () => {
  let response;
   
  try {
    response = await weebClient.getRandom({
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

[license]: https://github.com/hsiW/weeb-api.ts/blob/master/LICENSE
[ci]: https://travis-ci.org/meilasw/weeb-api.ts
[ci-badge]: https://travis-ci.org/meilasw/weeb-api.ts.svg?branch=master
[docs]: https://meilasw.github.io/weeb-api.ts/
[docs-badge]: https://img.shields.io/badge/docs-online-5023dd.svg
