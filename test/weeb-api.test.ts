import WeebAPI from "../src/weeb-api"

const weebClient = new WeebAPI(process.env.TOKEN)

describe("Get Types Array", () => {
  it("got data from api", done => {
    weebClient.getTypes().then(done)
  })
})

describe("Get Tags Array", () => {
  it("got data from api", done => {
    weebClient.getTags().then(done)
  })
})

describe("Get Image by ID", () => {
  it("got data from api", done => {
    weebClient.getImage("Hko6RAPFx").then(done)
  })
})

describe("Get Random Image", () => {
  it("got data from api with types", done => {
    weebClient
      .getRandom({
        type: "kiss",
        nsfw: "only"
      })
      .then(done)
  })

  it("got data from api with tags", done => {
    weebClient
      .getRandom({
        tags: "girl",
        nsfw: "true"
      })
      .then(done)
  })

  it("got data from api with both", done => {
    weebClient
      .getRandom({
        type: "hug",
        tags: "girl",
        nsfw: "false"
      })
      .then(done)
  })
})
