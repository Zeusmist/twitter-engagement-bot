export const retweet = async (page, tweetUrl) => {
  await page.goto(tweetUrl);
  const retweetBtn = await page.waitForXPath(
    "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/section/div/div/div/div/div[1]/div/div/article/div/div/div[3]/div[6]/div/div[2]/div"
  );
  await new Promise((r) => setTimeout(r, 1000));
  await retweetBtn.click();
  const confirmRetweetBtn = await page.waitForXPath(
    "/html/body/div[1]/div/div/div[1]/div[2]/div/div/div/div[2]/div/div[3]/div/div/div/div"
  );
  await new Promise((r) => setTimeout(r, 1000));
  await confirmRetweetBtn.click();
};
