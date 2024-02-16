import "tsarch/dist/jest";
import {filesOfProject} from "tsarch";

describe("Given the Entities layer", ()=> {
  jest.setTimeout(60000);

  it("Should not have dependencies from External in Entities", async ()=> {
    const rule = filesOfProject()
      .inFolder("entities")
      .shouldNot()
      .dependOnFiles()
      .inFolder("external");

    await expect(rule).toPassAsync();
  });

  it("Should not have dependencies from Controllers in Entities", async ()=> {
    const rule = filesOfProject()
      .inFolder("entities")
      .shouldNot()
      .dependOnFiles()
      .inFolder("adapters");

    await expect(rule).toPassAsync();
  });

  it("Should not have dependencies from UseCases in Entities", async ()=> {
    const rule = filesOfProject()
      .inFolder("entities")
      .shouldNot()
      .dependOnFiles()
      .inFolder("use-cases");

    await expect(rule).toPassAsync();
  });

  it("Should not have dependencies from UseCases in Entities", async ()=> {
    const rule = filesOfProject()
      .inFolder("entities")
      .shouldNot()
      .dependOnFiles()
      .inFolder("main");

    await expect(rule).toPassAsync();
  });
});

describe("Given the UseCases layer", ()=> {
  jest.setTimeout(60000);

  it("Should not have dependencies from External in UseCases", async ()=> {
    const rule = filesOfProject()
      .inFolder("use-cases")
      .shouldNot()
      .dependOnFiles()
      .inFolder("external");

    await expect(rule).toPassAsync();
  });

  it("Should not have dependencies from Adapters in UseCases", async ()=> {
    const rule = filesOfProject()
      .inFolder("use-cases")
      .shouldNot()
      .dependOnFiles()
      .inFolder("adapters");

    await expect(rule).toPassAsync();
  });

  it("Should not have dependencies from UseCases in UseCases", async ()=> {
    const rule = filesOfProject()
      .inFolder("use-cases")
      .shouldNot()
      .dependOnFiles()
      .inFolder("main");

    await expect(rule).toPassAsync();
  });
});

describe("Given the Adapters layer", ()=> {
  jest.setTimeout(60000);

  it("Should not have dependencies from External in Adapters", async ()=> {
    const rule = filesOfProject()
      .inFolder("adapters")
      .shouldNot()
      .dependOnFiles()
      .inFolder("external");

    await expect(rule).toPassAsync();
  });

  it("Should not have dependencies from UseCases in Adapters", async ()=> {
    const rule = filesOfProject()
      .inFolder("adapters")
      .shouldNot()
      .dependOnFiles()
      .inFolder("main");

    await expect(rule).toPassAsync();
  });
});
