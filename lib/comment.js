import { getCommentFromContext } from "./openai.js";

export const comment = async (
  page,
  tweetUrl,
  tweetText,
  commentContext,
  exactComment
) => {
  await page.goto(tweetUrl);

  let commentToSend;
  if (exactComment) commentToSend = commentContext;
  else {
    const aiResponse = await getCommentFromContext(tweetText, commentContext);
    if (!aiResponse) return;
    commentToSend = aiResponse.replace(/"/g, "");
  }

  const commentSection = await page.waitForXPath(
    "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/section/div/div/div/div/div[1]/div/div/div/div/div[2]/div[1]/div/div/div/div[2]/div[1]/div/div/div/div/div[1]/div/div/div/div/div/div/label"
  );
  await commentSection.click();
  await new Promise((r) => setTimeout(r, 1000));
  const commentSectionInput = await page.waitForXPath(
    "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/section/div/div/div/div/div[1]/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div[1]/div/div/div/div/div/div/div/div/div/div/div/label/div[1]/div/div/div/div/div/div[2]/div/div/div/div/div"
  );
  console.log({ commentSectionInput });
  await commentSectionInput.click();
  // type the comment
  await page.type(
    ".public-DraftStyleDefault-block > span:nth-child(1)",
    commentToSend,
    { delay: 100 }
  );
  const sendBtn = await page.waitForXPath(
    "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/section/div/div/div/div/div[1]/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div[2]"
  );
  console.log({ sendBtn });
  await new Promise((r) => setTimeout(r, 700));
  await sendBtn.click().then(() => console.log("clicked send button"));
  await new Promise((r) => setTimeout(r, 1000));
  const confirmSendBtnExists = await page
    .$eval("div.r-lp5zef:nth-child(1)", () => true)
    .catch(() => false);
  console.log({ confirmSendBtnExists });
  if (confirmSendBtnExists) {
    const confirmSendBtn = await page.waitForSelector(
      "div.r-lp5zef:nth-child(1)"
    );
    await confirmSendBtn.click();
  }
};
