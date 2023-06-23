- [Description](#description)
- [Setup](#setup)
- [Usage](#usage)

### DESCRIPTION

A program to perform actions on multiple twitter accounts.

- The program accepts a list of bot accounts to use
- The program loops over each account to perform the required actions.
- During each loop the program logs in the bot account, performs the required actions, then logs out the bot.
- The program accepts the following parameters:
  ~ Actions to perform (follow, like, retweet, comment) - Required
  ~ Number of bots to use.
  ~ A subject username
  ~ A tweet URL
  ~ A tweet text
  ~ A comment context
  ~ A boolean to indicate if comment context is the exact content that should be commented.

- If action == Follow, username is required.
- If action == Like, tweet url is required.
- If action == Retweet, tweet url is required.
- If action == Comment
  ~ The tweet url is required.
  ~ The comment context is required if exactComment is false.
  ~ A comment context is required. This should be a short string explaining what the comment should be about. ChatGPT would be used to generate a unique comment based on the context provided in relation to the tweet content.
  ~ If exactComment is true, the comment context should be the exact comment to be posted. ChatGpt would not be used.

- The program supports multiple actions in a single run. For example, the program can follow, like, and comment on a tweet in a single run.

### SETUP

You will need a botlist, a list of twitter accounts to use for the actions. The botlist should be a csv file with the following format:
`username,password`
An example botlist is provided in **botlist.csv**, simply replace the usernames and passwords with your own.
**Note:** The first line of the csv must be the header, and the header must be `username,password`

For use with a proxy network, BrightData Scraping Browswer is supported. set `export const USE_PROXY = true` in the config.js file.
For use with a local browser instance, Chrome is supported. (default)
Local browser does not run in headless mode by default. To run in headless mode, set `export const HEADLESS = true` config.js file.

- Go to BrightData.com and create an account
- Create a Scraping Browser instance
- Go to Access Parameters, you will see a _Host_, _Username_, and _Password_
- create a config.js file in the root directory with the following content:
  `export const BD_username = "USERNAME";`\
   `export const BD_password = "PASSWORD";`\
   `export const BD_hostUrl = "HOST";`
- Go to openai.com and create an account to get an API key
- Go back to the config.js file and add the following:
  `export const OPENAI_KEY = "API_KEY";`

For use with a local browser instance (chrome), specify the executable path in the config.js file:
`export const EXECUTABLE_PATH = "PATH_TO_CHROME";`
eg: _C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe_
(double backslashes)

• An example **config.js** file is provided in **config.example.js**, simply rename it to config.js and replace the values with your own.

### USAGE

- First time use: run `npm install` to install dependencies
- To run the program, follow the syntax below:
  `npm start <actions> <number of bots> <username> <tweet url> <tweet text> <comment context> <exactComment>`

**Note:**

- Actions should be a comma separated string. eg: `follow,like,comment`
- Tweet url, tweet text, and comment context should be enclosed in double quotes. eg: `"https://twitter.com/username/status/1234567890123456789" "This is a tweet" "This is a comment context"`
- exactComment should be a boolean. eg: `true` or `false`
