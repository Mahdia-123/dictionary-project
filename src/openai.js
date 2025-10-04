import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

console.log("API KEY:", process.env.REACT_APP_OPENAI_API_KEY); // debug
export default openai;
