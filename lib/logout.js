export const logout = async (browser, page) => {
  await page.goto("https://twitter.com/logout");
  const logoutBtn = await page.waitForSelector("div.css-18t94o4:nth-child(1)");
  await logoutBtn.click();
  await page.waitForSelector("div.css-18t94o4:nth-child(1)");
  console.log("logged out");

  await new Promise((r) => setTimeout(r, 3000));
  // await browser.close();
};
