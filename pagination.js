const { Builder, By } = require("selenium-webdriver");

async function DynamicTablePaginationWithLambdaTest() {
  const LT_USERNAME = ""; //replace with your username
  const LT_ACCESS_KEY = ""; //replace with your accesskey
  const GRID_HOST = "hub.lambdatest.com/wd/hub";

  const capabilities = {
    browserName: "Chrome",
    browserVersion: "latest",
    "LT:Options": {
      username: LT_USERNAME,
      accessKey: LT_ACCESS_KEY,
      geoLocation: "US",
      platformName: "Windows 10",
      build: "Date Picker",
      project: "Date Picker Example",
      w3c: true,
      plugin: "node_js-node_js",
    },
  };

  const gridUrl =
    "https://" + LT_USERNAME + ":" + LT_ACCESS_KEY + "@" + GRID_HOST;
  let driver;
  try {
    driver = await new Builder()
      .usingServer(gridUrl)
      .withCapabilities(capabilities)
      .build();

    return await WebtablePagination(driver);
  } catch (error) {
    throw error;
  } finally {
    await driver.quit();
  }
}

async function WebtablePagination(driver) {
  //Launch the browser

  if (!driver) return;

  try {
    await driver.get(
      "https://www.lambdatest.com/selenium-playground/table-sort-search-demo"
    );

    let namesElements = await driver.findElements(
      By.css("#example>tbody>tr>td:nth-child(1)")
    );

    const names = [];

    namesElements.forEach((element) => {
      names.push(element.getText());
    });

    let nextButtonClass = await driver
      .findElements(By.id("example_next"))
      .getAttribute("class");

    while (!nextButtonClass.includes("disabled")) {
      await driver.findElement(By.id("example_next")).click();

      // Wait for a few seconds (optional) to observe the results
      await driver.sleep(1000);

      namesElements = await driver.findElements(
        By.css("#example>tbody>tr>td:nth-child(1)")
      );

      namesElements.forEach((element) => {
        names.push(element.getText());
      });

      nextButtonClass = await driver
        .findElement(By.id("example_next"))
        .getAttribute("class");
    }

    names.forEach((name) => {
      console.log("Column names : " + name);
    });
  } catch (error) {
    console.log(error);
  }
}

DynamicTablePaginationWithLambdaTest();
