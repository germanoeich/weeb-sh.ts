import WeebAPI from "../src/weeb-sh"

let weebApi
if (process.env.WOLKETOKEN) {
  weebApi = new WeebAPI(process.env.WOLKETOKEN, 1);
} else {
  weebApi = new WeebAPI(process.env.TOKEN);
}

describe("Get Types Array", () => {
  it("got data from api", done => {
    weebApi.getTypes(false).then(data => {
        expect(data).toHaveProperty("types");

        done();
      }).catch(e => {
      expect(e).toHaveProperty('message');

      done();
    });
  });
});

describe("Get Tags Array", () => {
  it("got data from api", done => {
    weebApi.getTags(true).then(data => {
        expect(data).toHaveProperty("tags");

        done();
    }).catch(e => {
      expect(e).toHaveProperty('message');

      done();
    });
  });
});

describe("Get Image by ID", () => {
  it("got data from api", done => {
    weebApi.getImage("Hko6RAPFx").then(data => {
      expect(data).toHaveProperty("type");

      done();
    }).catch(e => {
      expect(e).toHaveProperty('message');

      done();
    });
  });
});

describe("Get Random Image", () => {
  it("got data from api with types", done => {
    weebApi.getRandom({
      type: "kiss",
      nsfw: "only",
      hidden: true,
    }).then(data => {
      expect(data).toHaveProperty("type");

      done();
    }).catch(e => {
      expect(e).toHaveProperty('message');

      done();
    });
  });

  it("got data from api with tags", done => {
    weebApi.getRandom({
      tags: "cuddle",
      nsfw: "false",
      hidden: true,
    }).then(data => {
      expect(data).toHaveProperty("type");

      done();
    }).catch(e => {
      expect(e).toHaveProperty('message');

      done();
    });
  });

  it("got data from api with both", done => {
    weebApi.getRandom({
      type: "hug",
      tags: "girl",
      nsfw: "false",
      hidden: false,
    }).then(data => {
      expect(data).toHaveProperty("type");

      done();
    }).catch(e => {
      expect(e).toHaveProperty('message');

      done();
    });
  });
});
