import puppeteer from "puppeteer-core";
import botlist from "./bot-list.js";
import {
  BD_hostUrl,
  BD_password,
  BD_username,
  EXECUTABLE_PATH,
  HEADLESS,
  USE_PROXY,
} from "./config.js";
import login from "./lib/login.js";
import { follow } from "./lib/follow.js";
import { like } from "./lib/like.js";
import { retweet } from "./lib/retweet.js";
import { comment } from "./lib/comment.js";
import { logout } from "./lib/logout.js";

const run = async (
  actions, // "follow" || "like" || "retweet" || "comment"
  numberOfBots = 1, // number of bots to use
  username, // username to follow
  tweetUrl, // tweet url to like, retweet, or comment on
  tweetText, // tweet text to comment on
  commentContext, // comment idea to generate comment from
  exactComment = false // whether to use the commentContext as the comment
) => {
  actions = actions?.split(",");
  // check for null values
  numberOfBots = numberOfBots == "null" ? null : numberOfBots;
  username = username == "null" ? null : username;
  tweetUrl = tweetUrl == "null" ? null : tweetUrl;
  commentContext = commentContext == "null" ? null : commentContext;
  exactComment = exactComment ? JSON.parse(exactComment) : false;

  if (!actions) throw new Error("Please provide an action");
  if (!numberOfBots) throw new Error("Please provide a number of bots");
  if (actions.includes("follow") && !username)
    throw new Error("Please provide a username to follow");
  if (actions.includes("like") && !tweetUrl)
    throw new Error("Please provide a tweet url to like");
  if (actions.includes("retweet") && !tweetUrl)
    throw new Error("Please provide a tweet url to retweet");
  if (actions.includes("comment") && !tweetUrl)
    throw new Error("Please provide a tweet url to comment on");
  if (actions.includes("comment") && !tweetText && !exactComment)
    throw new Error("Please provide the tweet text");
  if (actions.includes("comment") && !commentContext)
    throw new Error("Please provide a comment context");

  // shuffle and pick the first n bots
  const botsToUse = botlist
    .sort(() => 0.5 - Math.random())
    .slice(0, numberOfBots);

  let browser;
  let page;

  try {
    // loop over each bot
    for (const bot of botsToUse) {
      // create a browser instance
      console.log("Got bot", { bot });
      console.log("connected to browser");
      if (!browser) {
        if (USE_PROXY)
          browser = await puppeteer.connect({
            browserWSEndpoint: `wss://${BD_username}:${BD_password}@${BD_hostUrl}`,
          });
        else
          browser = await puppeteer.launch({
            headless: HEADLESS,
            executablePath: EXECUTABLE_PATH,
            args: ["--start-maximized"],
            defaultViewport: null,
          });
      }

      try {
        // login
        const { usernameDisplayTxt, page: createdPage } = await login(
          browser,
          page,
          bot
        );
        page = createdPage;

        if (!usernameDisplayTxt) throw new Error("Login unconfirmed");
        if (actions.includes("follow")) await follow(page, username);

        if (actions.includes("like")) await like(page, tweetUrl);

        if (actions.includes("retweet")) await retweet(page, tweetUrl);

        if (actions.includes("comment"))
          await comment(
            page,
            tweetUrl,
            tweetText,
            commentContext,
            exactComment
          );
      } catch (err) {
        console.error(err);
        await logout(browser, page);
      }

      await logout(browser, page);
    }
  } catch (err) {
    console.error(err);
  } finally {
    browser?.close();
  }
};

// eslint-disable-next-line no-undef
let args = process.argv.slice(2);
run(...args);
