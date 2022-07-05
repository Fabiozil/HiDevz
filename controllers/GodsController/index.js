const axios = require("axios");

class GodsController {
    constructor({ smiteApi }) {
        this.smiteApi = smiteApi;
    }

    //Get gods data
    async getGods() {
        try {
            const { timeStamp, signature } =
                this.smiteApi.getRequestCredentials("getgods");
            const sessionId = await this.smiteApi.createSession();
            if (sessionId === "ERROR") {
                return "ERROR";
            } else {
                const response = await axios.get(
                    `${this.smiteApi.baseUrl}/getgodsjson/${this.smiteApi.devId}/${signature}/${sessionId}/${timeStamp}/${this.smiteApi.languageCode}`
                );
                return response.data;
            }
        } catch (error) {
            console.error(error);
        }
    }

    //Get god and queue combination leaderboard for current season [Only queues 440, 450, 451]
    async getGodQueueLeaderboard(godId, queueId) {
        try {
            const { timeStamp, signature } =
                this.smiteApi.getRequestCredentials("getgodleaderboard");
            const sessionId = await this.smiteApi.createSession();
            if (sessionId === "ERROR") {
                return "ERROR";
            } else {
                const response = await axios.get(
                    `${this.smiteApi.baseUrl}/getgodleaderboardjson/${this.smiteApi.devId}/${signature}/${sessionId}/${timeStamp}/${godId}/${queueId}`
                );
                return response.data;
            }
        } catch (error) {
            console.error(error);
        }
    }

    //Get god skins
    async getGodSkins(godId) {}

    //Get all items
    async getItems() {
        try {
            const { timeStamp, signature } =
                this.smiteApi.getRequestCredentials("getitems");
            const sessionId = await this.smiteApi.createSession();
            if (sessionId === "ERROR") {
                return "ERROR";
            } else {
                const response = await axios.get(
                    `${this.smiteApi.baseUrl}/getitemsjson/${this.smiteApi.devId}/${signature}/${sessionId}/${timeStamp}/${this.smiteApi.languageCode}`
                );
                return response.data;
            }
        } catch (error) {
            console.error(error);
        }
    }

    //Get all gods abilities
    async getAbilities() {
        try {
            const abilities = [];
            const { timeStamp, signature } =
                this.smiteApi.getRequestCredentials("getgods");
            const sessionId = await this.smiteApi.createSession();
            if (sessionId === "ERROR") {
                return "ERROR";
            } else {
                const response = await axios.get(
                    `${this.smiteApi.baseUrl}/getgodsjson/${this.smiteApi.devId}/${signature}/${sessionId}/${timeStamp}/${this.smiteApi.languageCode}`
                );

                response.data.map((god) => {
                    abilities.push({
                        godId: god.id,
                        abilities: [
                            god.Ability_1,
                            god.Ability_2,
                            god.Ability_3,
                            god.Ability_4,
                            god.Ability_5,
                        ],
                    });
                });
                return abilities;
            }
        } catch (error) {
            console.error(error);
        }
    }

    //Get god recommeded items
    async getGodRecommendedItems(godId) {}
}

module.exports = { GodsController };
