import { Browser } from "puppeteer-core";

const login = async (
  browser = Browser,
  page,
  bot = { username: "", password: "" }
) => {
  console.log("start login");
  const loginUrl = "https://twitter.com/i/flow/login";
  const totalOpenendTabs = (await browser.pages()?.length) ?? 0;
  console.log({ totalOpenendTabs });
  // if (totalOpenendTabs > 0) page = await browser.pages()[0];
  if (!page) page = await browser.newPage();
  await page.goto(loginUrl);
  console.log("opening login page");
  const usernameLabel = await page.waitForSelector("label.css-1dbjc4n");
  await usernameLabel.click();
  console.log("clicking username label");
  await new Promise((r) => setTimeout(r, 100));
  await page.type(".r-30o5oe", bot.username, { delay: 100 });
  await page.keyboard.press("Enter");
  console.log("typed username");
  await page.waitForSelector(".r-homxoj");
  console.log("found password input");
  await page.type(".r-homxoj", bot.password, { delay: 100 });
  console.log("typed password");
  await page.keyboard.press("Enter");
  console.log("pressed enter for password");

  await new Promise((r) => setTimeout(r, 1000));
  // await page.goto("https://twitter.com");
  // console.log("opened twitter.com");
  const usernameDisplay = await page.waitForSelector(
    ".r-1fz3rvf > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)"
  );
  const usernameDisplayTxt = await usernameDisplay.evaluate(
    (el) => el.textContent
  );

  console.log({ usernameDisplayTxt });
  return { usernameDisplayTxt, page };
};

export default login;
