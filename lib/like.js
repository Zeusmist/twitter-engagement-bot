export const like = async (page, tweetUrl) => {
  await page.goto(tweetUrl);
  const likeBtn = await page.waitForXPath(
    "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/section/div/div/div/div/div[1]/div/div/article/div/div/div[3]/div[6]/div/div[3]"
  );
  await new Promise((r) => setTimeout(r, 2000));
  await likeBtn.click();
};
