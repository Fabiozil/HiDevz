const axios = require("axios");

class MatchController {
    constructor({ smiteApi }) {
        this.smiteApi = smiteApi;
    }

    async getModeDetails(matchId) {
        try {
            const { timeStamp, signature } =
                this.smiteApi.getRequestCredentials("getplayer");
            const sessionId = await this.smiteApi.createSession();
            if (sessionId === "ERROR") {
                return "ERROR";
            } else {
                const response = await axios.get(
                    `${this.smiteApi.baseUrl}/getplayerjson/${this.smiteApi.devId}/${signature}/${sessionId}/${timeStamp}/${matchId}`
                );
                return response.data;
            }
        } catch (error) {
            console.error(error);
        }
    }

    async getMatchDetails(matchId) {
        try {
            const { timeStamp, signature } =
                this.smiteApi.getRequestCredentials("getmatchdetails");
            const sessionId = await this.smiteApi.createSession();
            if (sessionId === "ERROR") {
                return "ERROR";
            } else {
                const response = await axios.get(
                    `${this.smiteApi.baseUrl}/getmatchdetailsjson/${this.smiteApi.devId}/${signature}/${sessionId}/${timeStamp}/${matchId}`
                );
                return response.data;
            }
        } catch (error) {
            console.error(error);
        }
    }

    async getMatchPlayerDetails(matchId) {
        try {
            const { timeStamp, signature } =
                this.smiteApi.getRequestCredentials("getmatchplayerdetails");
            const sessionId = await this.smiteApi.createSession();
            if (sessionId === "ERROR") {
                return "ERROR";
            } else {
                const response = await axios.get(
                    `${this.smiteApi.baseUrl}/getmatchplayerdetails/${this.smiteApi.devId}/${signature}/${sessionId}/${timeStamp}/${matchId}`
                );
                return response.data;
            }
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = { MatchController };
