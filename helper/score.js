import API from "../utils/api";
import moment from "moment";

const score = {
    create: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/score/create", data)
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

    getperuser: (username) =>
        new Promise(function (resolve, reject) {
            API.get("/score/getperuser?user_name=" + username)
                .then(async (res) => {
                    resolve(score.formatperuser(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

        formatperuser: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.id,
                module_id: d.module_id,
                exam_name: d.exam_name,
                score: d.score,
                tot_score: d.tot_score,
                percentage: d.percentage,
                exam_date: moment(d.exam_date).format("DD-MMM-YYYY"),
                user_name: d.user_name,
            });
        }

        return formatted;
    },

    get: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/score/get";
            const filterUrl = score.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(score.format(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
	format: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.id,
                exam_name: d.exam_name,
                module_id: d.module_id,
                score: d.score,
                tot_score: d.tot_score,
                percentage: d.percentage,
                exam_date: moment(d.exam_date).format("DD-MMM-YYYY"),
                user_name: d.user_name,
            });
        }
        return formatted;
    },

    getFilteredData: (filter) =>
      new Promise(function (resolve, reject) {
        const baseUrl = "/score/getFilteredData";
		const filterUrl = score.getFilterUrl(filter);
		API.get(`${baseUrl}?${filterUrl}`)
            .then(async (res) => {
                resolve(score.formatfd(res.data));
            })
            .catch((err) => {
                reject(err);
            });
    }),

    formatfd: (data) => {
        const formatted = [];

    for (let d of data) {
        formatted.push({
            id: d.id,
            exam_name: d.exam_name,
            module_id: d.module_id,
            score: d.score,
            tot_score: d.tot_score,
            percentage: d.percentage,
            exam_date: moment(d.exam_date).format("DD-MMM-YYYY"),
            user_name: d.user_name,
        });
    }
    return formatted;
    },

    getFilterUrl: (filter) => {
		let url = "";

		if (filter !== undefined) {
			if (filter.user_name !== undefined) {
				url += "user_name=" + filter.user_name + "&";
			}
            if (filter.exam_paper_id !== undefined) {
				url += "exam_paper_id=" + filter.exam_paper_id + "&";
			}
               if (filter.tnnt_id !== undefined) {
                url += "tnnt_id=" + filter.tnnt_id + "&";
            }
		}
		return url;
	},

    checkAnswer: (data) =>
        new Promise(function (resolve, reject) {
            API.get(
                "/score/check?user_name=" +
                    data.user_name +
                    "," +
                    data.module_id +
                    "," +
                    data.created_at +
                    "," +
                    data.quest_id
            )
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    insertAnswer: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/score/insert", data)
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

    updateAnswer: (data) =>
        new Promise(function (resolve, reject) {
            API.patch("/score/update", data)
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

export default score;
