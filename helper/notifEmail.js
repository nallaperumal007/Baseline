import API from "../utils/api";

const notifEmail = {
    sendMail: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/notifEmail/insertRecord", data, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
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
};

export default notifEmail;
