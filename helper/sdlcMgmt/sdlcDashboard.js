import API from "../../utils/api";

const SdlcDash = {

    getBreakdownClient: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/sdlcDashboard/getBreakdownClient";
            const filterUrl = SdlcDash.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    getBreakdownProject: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/sdlcDashboard/getBreakdownProject";
            const filterUrl = SdlcDash.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    getBreakdownModule: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/sdlcDashboard/getBreakdownModule";
            const filterUrl = SdlcDash.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    getBreakdownFeatureByUS: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/sdlcDashboard/getBreakdownFeatureByUS";
            const filterUrl = SdlcDash.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    getBreakdownFeatureByBug: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/sdlcDashboard/getBreakdownFeatureByBug";
            const filterUrl = SdlcDash.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    getBreakdownUserStory: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/sdlcDashboard/getBreakdownUserStory";
            const filterUrl = SdlcDash.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    getFilterUrl: (filter) => {
        let url = "";

        if (filter !== undefined) {
            if (filter.clt_id !== undefined) {
                url += "clt_id=" + filter.clt_id + "&";
            }
            if (filter.proj_id !== undefined) {
                url += "proj_id=" + filter.proj_id + "&";
            }
            if (filter.tnnt_id !== undefined) {
                url += "tnnt_id=" + filter.tnnt_id + "&";
            }
        }
        return url;
    },
};

export default SdlcDash;
