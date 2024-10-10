import API from "../utils/api";

const AcWebinarReg = {

   insertRecord: (data) =>
    new Promise(function (resolve, reject) {
         API.post("/acWebinarReg/insertRecord", data,
        // {
        //     headers: {
        //         "x-access-token": global.config.accessToken,
        //     },
        // }
        )
            .then(async (res) => {
                console.log(res)
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

export default AcWebinarReg;

