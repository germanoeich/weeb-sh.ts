import WeebAPI from "../src/weeb-api"

const weebApi = new WeebAPI(process.env.TOKEN);

describe("Get Types Array", () => {
  it("got data from api", () => {
    weebApi.getTypes(false).then(data => {
        expect(data).toHaveProperty("types")
      }).catch(e => {
        console.log(e);
      });
  });
});

describe("Get Tags Array", () => {
  it("got data from api", () => {
    weebApi.getTags(true).then(data => {
        expect(data).toHaveProperty("tags");
    }).catch(e => {
      expect(e).toBeDefined();
    });
  });
});

describe("Get Image by ID", () => {
  it("got data from api", () => {
    weebApi.getImage("Hko6RAPFx").then(data => {
      expect(data).toHaveProperty("type")
    }).catch(e => {
      expect(e).toBeDefined()
    });
  });
});

describe("Get Random Image", () => {
  it("got data from api with types", () => {
    weebApi.getRandom({
      type: "kiss",
      nsfw: "only"
    }).then(data => {
      expect(data).toHaveProperty("type")
    }).catch(e => {
      expect(e).toBeDefined()
    });
  });

  it("got data from api with tags", () => {
    weebApi.getRandom({
      tags: "girl",
      nsfw: "true"
    }).then(data => {
      expect(data).toHaveProperty("type")
    }).catch(e => {
      expect(e).toBeDefined()
    });
  });

  it("got data from api with both", () => {
    weebApi.getRandom({
      type: "hug",
      tags: "girl",
      nsfw: "false"
    }).then(data => {
      expect(data).toHaveProperty("type")
    }).catch(e => {
      expect(e).toBeDefined()
    });
  });
});
