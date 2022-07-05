//Imports
const dotenv = require("dotenv");
const { ApiController } = require("./controllers/ApiController/index.js");
const { GodsController } = require("./controllers/GodsController/index.js");
const {
    PlayerController,
} = require("./controllers/PlayersController/index.js");
const { MatchController } = require("./controllers/MatchController/index.js");
dotenv.config();

//Constant definition
const baseUrl = process.env.BASE_URL;
const devSecret = process.env.DEV_SECRET;
const devId = process.env.DEV_ID;
const languageCode = 1;

//We initialize the ApiController object who connects with the API, is the base of all requests
const smiteApi = new ApiController({
    baseUrl,
    devSecret,
    devId,
    languageCode,
});

//We initialize the GodController object who manages the gods related requests
const godsController = new GodsController({
    smiteApi,
});

const playerController = new PlayerController({
    smiteApi,
});

// const matchController = new MatchController({
//     smiteApi,
// });

const main = async () => {
    const response = await smiteApi.ping();
    console.log(JSON.stringify(response));
    const abilities = await godsController.getAbilities();
    console.log(abilities[0].abilities[0]);
};

main();
