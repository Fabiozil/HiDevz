const axios = require("axios");

class PlayerController {
    constructor({ smiteApi }) {
        this.smiteApi = smiteApi;
    }

    async getPlayer(playerName) {
        try {
            const { timeStamp, signature } =
                this.smiteApi.getRequestCredentials("getplayer");
            const sessionId = await this.smiteApi.createSession();
            if (sessionId === "ERROR") {
                return "ERROR";
            } else {
                const response = await axios.get(
                    `${this.smiteApi.baseUrl}/getplayerjson/${this.smiteApi.devId}/${signature}/${sessionId}/${timeStamp}/${playerName}`
                );
                return response.data;
            }
        } catch (error) {
            console.error(error);
        }
    }

    async getFriends(playerId) {
        try {
            const { timeStamp, signature } =
                this.smiteApi.getRequestCredentials("getfriends");
            const sessionId = await this.smiteApi.createSession();
            if (sessionId === "ERROR") {
                return "ERROR";
            } else {
                const response = await axios.get(
                    `${this.smiteApi.baseUrl}/getfriendsjson/${this.smiteApi.devId}/${signature}/${sessionId}/${timeStamp}/${playerId}}`
                );
                return response.data;
            }
        } catch (error) {
            console.error(error);
        }
    }

    async getGodRanks(playerId) {
        try {
            const { timeStamp, signature } =
                this.smiteApi.getRequestCredentials("getgodranks");
            const sessionId = await this.smiteApi.createSession();
            if (sessionId === "ERROR") {
                return "ERROR";
            } else {
                const response = await axios.get(
                    `${this.smiteApi.baseUrl}/getgodranksjson/${this.smiteApi.devId}/${signature}/${sessionId}/${timeStamp}/${playerId}`
                );
                return response.data;
            }
        } catch (error) {
            console.error(error);
        }
    }

    async getMatchHistory(playerId) {
        try {
            const { timeStamp, signature } =
                this.smiteApi.getRequestCredentials("getmatchhistory");
            const sessionId = await this.smiteApi.createSession();
            if (sessionId === "ERROR") {
                return "ERROR";
            } else {
                const response = await axios.get(
                    `${this.smiteApi.baseUrl}/getmatchhistoryjson/${this.smiteApi.devId}/${signature}/${sessionId}/${timeStamp}/${playerId}`
                );
                return response.data;
            }
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = { PlayerController };
