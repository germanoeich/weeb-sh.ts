##Usage
  
```typescript
import WeebAPI from 'weeb-api';
  
const weebClient = new WeebAPI('key');
```

####Get an array of all the current types

```typescript
let response;
 
try {
  response = await weebClient.getTypes()
} catch(e) {
  // Handle error
}
```

####Get an array of all the current tags

```typescript
let response;
  
try {
  response = await weebClient.getTags()
} catch(e) {
  // Handle error
}
```

####Get info on an image using its ID

```typescript
let response;
  
try {
  response = await weebClient.getImage(id)
} catch(e) {
  // Handle error
}
```

####Get a random image using the passed options.
Both type and tags are optional but one of either must always be supplied. 
`nsfw` does not need to be supplied and will default to false.

#####Options explanation
   
```typescript
const options = {
  type: string, // Image type
  tags: string, // Image tags, a list of tags seperated by commas
  nsfw: string, // false(no nsfw), true(nsfw and no-nsfw), only(only nsfw)
}
```
 
#####Leaving out image tags
   
```typescript
let response;
  
try {
  response = await weebClient.getRandom({
    type: 'hug',
    nsfw: 'only',
  });
} catch(e) {
  // Handle error
}
```

#####Leaving out image type

```typescript
let response;
  
try {
  response = await weebClient.getRandom({
    tags: 'girl,cute',
    nsfw: 'only',
  });
} catch(e) {
  // Handle error
}
```

#####Supplying all options

```typescript
let response;
 
try {
  response = await weebClient.getRandom({
    type: 'kiss',
    tags: 'girl',
    nsfw: 'true',
  });
} catch(e) {
  // Handle error
}
```
