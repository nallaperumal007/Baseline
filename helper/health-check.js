import API from "../utils/api";

const health = {
    create: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/healthcheck", data)
                .then(async (res) => {
                    if (res.status === 200) {
                        resolve(res.data);
                    } else {
                        reject(res.data.msg);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    update: (data) =>
        new Promise(function (resolve, reject) {
            API.patch("/healthcheck/update", data)
                .then(async (res) => {
                    if (res.status === 200) {
                        resolve(res.data);
                    } else {
                        reject(res.data.msg);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    getHealthDetails: () =>
        new Promise(function (resolve, reject) {
            API.get("/healthcheck/get")
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),
};

export default health;
