// this source generated by GenAI pythonProject
import API from "../../utils/api";

const SdBugDet = {

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/sdBugDet/insertRecord", data, {
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

    updateRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.patch("/sdBugDet/updateRecord", data, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    
	getRecord: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/sdBugDet/getRecord";
            const filterUrl = SdBugDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(SdBugDet.formatRecord(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatRecord: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                

            id: d.id,
            feat_id: d.feat_id,
            feat_name: d.feat_name,
            summary: d.summary,
            actual_result: d.actual_result,
            expected_result: d.expected_result,
            recreate_steps: d.recreate_steps,
            reporter_remarks: d.reporter_remarks,
            release_id: d.release_id,
            bug_status_id: d.bug_status_id,
            clt_ref_id: d.clt_ref_id,
            lc_status_id: d.lc_status_id,
            is_active: d.is_active,
            created_at: d.created_at,
            created_by: d.created_by,
            tnnt_id: d.tnnt_id,

            });
        }
        return formatted;
    },

	getPageDet: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/sdBugDet/getPageDet";
            const filterUrl = SdBugDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(SdBugDet.formatPageDet(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatPageDet: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                comment_cnt: d.comment_cnt == null ? 0 : d.comment_cnt,
				

            id: d.id,
            feat_id: d.feat_id,
            feat_name: d.feat_name,
            summary: d.summary,
            actual_result: d.actual_result,
            expected_result: d.expected_result,
            recreate_steps: d.recreate_steps,
            reporter_remarks: d.reporter_remarks,
            release_id: d.release_id,
            bug_status_id: d.bug_status_id,
            clt_ref_id: d.clt_ref_id,
            lc_status_id: d.lc_status_id,
            is_active: d.is_active,
            created_at: d.created_at,
            created_by: d.created_by,
            tnnt_id: d.tnnt_id,

            });
        }
        return formatted;
    },
    getAuditData: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/sdBugDet/getAudit";
            const filterUrl = SdBugDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    console.log("res.data: ", res.data);
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    getFilteredData: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/sdBugDet/getFilteredData";
            const filterUrl = SdBugDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(SdBugDet.formatFiltered(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatFiltered: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                

            id: d.id,
            feat_id: d.feat_id,
            feat_name: d.feat_name,
            summary: d.summary,
            actual_result: d.actual_result,
            expected_result: d.expected_result,
            recreate_steps: d.recreate_steps,
            reporter_remarks: d.reporter_remarks,
            release_id: d.release_id,
            bug_status_id: d.bug_status_id,
            clt_ref_id: d.clt_ref_id,
            lc_status_id: d.lc_status_id,
            is_active: d.is_active,
            created_at: d.created_at,
            created_by: d.created_by,
            tnnt_id: d.tnnt_id,

            });
        }
        return formatted;
    },

    getForDropDown: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/sdDdLookup/getForDropDown";
            const filterUrl = SdBugDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(SdBugDet.formatdd(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatdd: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                feat_id: d.rec_id,
                feat_name: d.rec_name,
            });
        }
        return formatted;
    },

    getFilterUrl: (filter) => {
        let url = "";

        if (filter !== undefined) {
			if (filter.com_id !== undefined) {
              url += "com_id=" + filter.com_id + "&";
            }

if (filter.id !== undefined) {
    url += "id=" + filter.id + "&";
}
if (filter.feat_id !== undefined) {
    url += "feat_id=" + filter.feat_id + "&";
}
if (filter.summary !== undefined) {
    url += "summary=" + filter.summary + "&";
}
if (filter.actual_result !== undefined) {
    url += "actual_result=" + filter.actual_result + "&";
}
if (filter.expected_result !== undefined) {
    url += "expected_result=" + filter.expected_result + "&";
}
if (filter.recreate_steps !== undefined) {
    url += "recreate_steps=" + filter.recreate_steps + "&";
}
if (filter.reporter_remarks !== undefined) {
    url += "reporter_remarks=" + filter.reporter_remarks + "&";
}
if (filter.release_id !== undefined) {
    url += "release_id=" + filter.release_id + "&";
}
if (filter.bug_status_id !== undefined) {
    url += "bug_status_id=" + filter.bug_status_id + "&";
}
if (filter.clt_ref_id !== undefined) {
    url += "clt_ref_id=" + filter.clt_ref_id + "&";
}
if (filter.lc_status_id !== undefined) {
    url += "lc_status_id=" + filter.lc_status_id + "&";
}
if (filter.is_active !== undefined) {
    url += "is_active=" + filter.is_active + "&";
}
if (filter.created_at !== undefined) {
    url += "created_at=" + filter.created_at + "&";
}
if (filter.created_by !== undefined) {
    url += "created_by=" + filter.created_by + "&";
}
if (filter.tnnt_id !== undefined) {
    url += "tnnt_id=" + filter.tnnt_id + "&";
}
if (filter.ref_id !== undefined) { 
 url += "ref_id=" + filter.ref_id + "&";
}
			//param_value
            
        }
        return url;
    },
};

export default SdBugDet;