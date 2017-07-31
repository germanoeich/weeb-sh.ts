import WeebAPI from "../src/weeb-api"
import { Image, Tags, Types } from "../src/weeb-api"

const weebClient = new WeebAPI(process.env.TOKEN)

describe("Get Types Array", () => {
  it("got data from api", () => {
    weebClient.getTypes().then(data => expect(data).toBeDefined())
  })
})

describe("Get Tags Array", () => {
  it("got data from api", () => {
    weebClient.getTags().then(data => expect(data).toBeDefined())
  })
})

describe("Get Image by ID", () => {
  it("got data from api", () => {
    weebClient.getImage("Hko6RAPFx").then(data => expect(data).toBeDefined())
  })
})

describe("Get Random Image", () => {
  it("got data from api with types", () => {
    weebClient
      .getRandom({
        type: "kiss",
        nsfw: "only"
      })
      .then(data => expect(data).toBeDefined())
  })

  it("got data from api with tags", () => {
    weebClient
      .getRandom({
        tags: "girl",
        nsfw: "true"
      })
      .then(data => expect(data).toBeDefined())
  })

  it("got data from api with both", () => {
    weebClient
      .getRandom({
        type: "hug",
        tags: "girl",
        nsfw: "false"
      })
      .then(data => expect(data).toBeDefined())
  })
})
