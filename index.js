const { Builder, By, ChromiumWebDriver } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function DynamicTableLocallyExample() {
  // launch the browser

  let driver = await new Builder().forBrowser("chrome").build();

  // Navigate to our app application

  await driver.get(
    "https://www.lambdatest.com/selenium-playground/table-data-download-demo"
  );

  //  Example One
  const innerText1 = await driver
    .findElement(By.xpath("//table/tbody/tr[2]/td[1]"))
    .getText();

  console.log(innerText1);

  //  Example Two

  const innerText2 = await driver
    .findElement(By.xpath("//table/tbody/tr[3]/td[1]/table/tbody/tr[2]/td[1]"))
    .getText();

  console.log(innerText2);

  //  Example Three
  const innerText3 = await driver
    .findElement(By.xpath('//table[@background = "grey"]/tbody/tr[2]/td[1]'))
    .getText();

  console.log(innerText3);

  //clean the browser
  driver.quit();
}

DynamicTableLocallyExample();

async function DynamicTableWithLambdaTest() {
  const USERNAME = ""; //replace with your username
  const KEY = ""; //replace with your accesskey
  const GRID_HOST = "hub.lambdatest.com/wd/hub";

  const capabilities = {
    browserName: "Chrome",
    browserVersion: "107.0",
    "LT:Options": {
      username: USERNAME,
      accessKey: KEY,
      geoLocation: "US",
      platformName: "Windows 10",
      build: "Date Picker",
      project: "Date Picker Example",
      w3c: true,
      plugin: "node_js-node_js",
    },
  };

  const gridUrl = "https://" + USERNAME + ":" + KEY + "@" + GRID_HOST;
  let driver;
  try {
    driver = await new Builder()
      .usingServer(gridUrl)
      .withCapabilities(capabilities)
      .build();

    return await selectDynamicTable(driver);
  } catch (error) {
    throw error;
  } finally {
    await driver.quit();
  }
}

async function selectDynamicTable(driver) {
  //Launch the browser

  if (!driver) return;
  await driver.get(
    "https://www.lambdatest.com/selenium-playground/table-data-download-demo"
  );

  //Finding the number of Rows

  const numberOfRows = await driver.findElements(
    By.xpath('//*[@id="example"]/tbody/tr[1]/td[1]')
  );
  const totalRows = numberOfRows.length;
  console.log("No of rows in this table : " + totalRows);

  //Finding the number of Columns

  const numberOfColumns = await driver.findElements(
    By.xpath(`//*[@id="example"]/thead/tr/th[1]`)
  );
  const totalColumns = numberOfColumns.length;
  console.log("No of columns in this table : " + totalColumns);

  //Finding cell value at 7th row and 1st column

  const innerText = await driver
    .findElement(
      By.xpath(
        "/html/body/div[1]/div/section[2]/div/div/div/div/div/table/tbody/tr[7]/td[1]"
      )
    )
    .getText();

  console.log(innerText);
}

DynamicTableWithLambdaTest();
