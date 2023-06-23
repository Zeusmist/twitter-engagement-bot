export const follow = async (page, username) => {
  await page.goto(`https://twitter.com/${username}`);
  const followBtn = await page.waitForSelector(
    "div.r-1w6e6rj:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1)"
  );
  const followBtnTxt = await followBtn.evaluate((el) => el.textContent);
  console.log({ followBtnTxt });
  if (followBtnTxt != "Follow") return;
  await new Promise((r) => setTimeout(r, 1000));
  await followBtn.click();
};
