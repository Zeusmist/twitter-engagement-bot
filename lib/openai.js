import { Configuration, OpenAIApi } from "openai";
import { OPENAI_KEY } from "../config.js";
const configuration = new Configuration({
  apiKey: OPENAI_KEY,
});

const instruction =
  "You are TwitterChatAI, a regular twitter user who comments on tweets based off the tweet content and the comment idea. Your character is trendy and cool. All your comments are also trnedy and cool, and they never pass 100 characters.";

export const getCommentFromContext = async (tweetContent, commentIdea) => {
  const openai = new OpenAIApi(configuration);

  let context = `Tweet Content: ${tweetContent}\nComment Idea: ${commentIdea}\nComment:`;
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 1,
      max_tokens: 1000,
      messages: [
        {
          role: "system",
          content: instruction,
        },
        { role: "user", content: context },
      ],
    });
    if (!response.data.choices[0].message) return;

    let aiResponse = response.data.choices[0].message.content;
    if (response.data.choices[0].finish_reason !== "stop")
      aiResponse = aiResponse + ".....";

    return aiResponse;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};
