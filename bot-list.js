import csvToJson from "csvtojson";

const botlist = await csvToJson().fromFile("./botlist.csv");

export default botlist;
