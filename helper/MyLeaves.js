import API from "../utils/api";
import moment from "moment";

const MyLeaves = {
    get: () =>
        new Promise(function (resolve, reject) {
            API.get("/MyLeaves/get")
                .then(async (res) => {
                    resolve(MyLeaves.format(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    format: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                date: moment(d.date).format("DD-MMM-YYYY"),
                leave_type: d.leave_type,
                remarks: d.remarks,
            });
        }

        return formatted;
    },

    getmyleavelist: (username) =>
        new Promise(function (resolve, reject) {
            API.get("/MyLeaves/getmylist?user_name=" + username)
                .then(async (res) => {
                    resolve(MyLeaves.formatlist(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatlist: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                date: d.date,
                leave_type: d.leave_type,
                remarks: d.remarks,
            });
        }

        return formatted;
    },

    getmyleavesumm: (username) =>
        new Promise(function (resolve, reject) {
            API.get("/MyLeaves/getmyleavesumm?user_name=" + username)
                .then(async (res) => {
                    resolve(MyLeaves.formatsumm(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatsumm: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                date: d.date,
                leave_type: d.leave_type,
                remarks: d.remarks,
            });
        }
        return formatted;
    },

    getLeaveSummary: (filter) =>
        new Promise(function (resolve, reject) {
            console.log(filter);
            const baseUrl = "/leave/getLeaveSummary";
            const filterUrl = MyLeaves.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    console.log(res.data);
                    resolve(MyLeaves.formatLeave(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatLeave: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                leave_name: d.leave_name,
                alloc_leaves: d.alloc_leaves,
                alloc_year: d.alloc_year,
                tot_consumed: d.tot_consumed,
            });
        }
        return formatted;
    },

    getLeaveList: (filter) =>
        new Promise(function (resolve, reject) {
            console.log(filter);
            const baseUrl = "/leave/getLeaveList";
            const filterUrl = MyLeaves.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    console.log(res.data);
                    resolve(MyLeaves.formatList(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatList: (data) => {
        const formatted = [];
        for (let d of data) {
            formatted.push({
                leave_date: moment(d.leave_date).format("DD-MMM-YYYY"),
                leave_type: d.leave_type,
                hrs_rec: d.hrs_rec,
                remarks: d.remarks,
            });
        }
        return formatted;
    },

    getFilterUrl: (filter) => {
        let url = "";

        if (filter !== undefined) {
            if (filter.is_active !== undefined) {
                url += "is_active=" + filter.is_active + "&";
            }
            if (filter.username !== undefined) {
                url += "username=" + filter.username + "&";
            }
            if (filter.tnnt_id !== undefined) {
                url += "tnnt_id=" + filter.tnnt_id + "&";
            }
        }
        return url;
    },
};

export default MyLeaves;
