const axios = require("axios");
const moment = require("moment");
const md5 = require("md5");

class ApiController {
    //Constructor of each SmiteApi object who needs the baseUrl, devId and devSecret
    constructor({ devId, devSecret, baseUrl, languageCode }) {
        this.devId = devId;
        this.devSecret = devSecret;
        this.baseUrl = baseUrl;
        this.languageCode = languageCode;
    }

    //Obtain the time stamp of the server who manages UTC hour and 24H format
    getTimeStamp() {
        return moment.utc().format("YYYYMMDDHHmmss");
    }

    //Obtain the signature for each request
    getSignature(method) {
        return md5(this.devId + method + this.devSecret + this.getTimeStamp());
    }

    //Obtain time stamp and signature returned in an object
    getRequestCredentials(method) {
        return {
            timeStamp: this.getTimeStamp(),
            signature: this.getSignature(method),
        };
    }

    //Verifies the server status
    async ping() {
        try {
            const response = await axios.get(`${this.baseUrl}/pingjson`);
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    //Create session and return data with session token
    async createSession() {
        try {
            const { timeStamp, signature } =
                this.getRequestCredentials("createsession");

            const response = await axios.get(
                `${this.baseUrl}/createsessionJson/${this.devId}/${signature}/${timeStamp}`
            );

            if (response.data.ret_msg !== "Approved") {
                return "ERROR";
            } else {
                return response.data.session_id;
            }
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    //Test session
    async testSession() {
        try {
            const { timeStamp, signature } =
                this.getRequestCredentials("testsession");

            const sessionId = await this.createSession();

            if (sessionId === "ERROR") {
                return "ERROR";
            } else {
                const response = await axios.get(
                    `${this.baseUrl}/testsessionjson/${this.devId}/${signature}/${sessionId}/${timeStamp}`
                );
                console.log("Test Session: \n" + response.data);
                return response.data;
            }
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}

module.exports = { ApiController };

//Function to ping to the server
