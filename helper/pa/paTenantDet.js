import API from "../../utils/api";
import moment from "moment";

const PaTenantDet = {

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/paTenantDet/insertRecord", data, {
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
            API.patch("/paTenantDet/updateRecord", data, {
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
            const baseUrl = "/paTenantDet/getRecord";
            const filterUrl = PaTenantDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PaTenantDet.formatRecord(res.data));
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
                clt_ref_id: d.clt_ref_id,
                tnnt_name: d.tnnt_name,
                abbr: d.abbr,
                database_name: d.database_name,
                user_name: d.user_name,
                admin_password: d.admin_password,
                start_date: d.start_date == null ? "" : moment(d.start_date).format("DD/MM/YYYY"),
                end_date: d.end_date == null ? "" : moment(d.end_date).format("DD/MM/YYYY"),
                email_from_id: d.email_from_id,
                whatsapp_from_id: d.whatsapp_from_id,
                language_id: d.language_id,
                lc_status_id: d.lc_status_id,
                is_active: d.is_active,
                created_at: d.created_at,
                created_by: d.created_by,

            });
        }
        return formatted;
    },

	getPageDet: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/paTenantDet/getPageDet";
            const filterUrl = PaTenantDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PaTenantDet.formatPageDet(res.data));
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
            clt_ref_id: d.clt_ref_id,
            tnnt_name: d.tnnt_name,
            abbr: d.abbr,
            database_name: d.database_name,
            user_name: d.user_name,
            admin_password: d.admin_password,
            start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
            end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
            email_from_id: d.email_from_id,
            whatsapp_from_id: d.whatsapp_from_id,
            language_id: d.language_id,
            lc_status_id: d.lc_status_id,
            is_active: d.is_active,
            created_at: d.created_at,
            created_by: d.created_by,

            });
        }
        return formatted;
    },	

    getFilteredData: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/paTenantDet/getFilteredData";
            const filterUrl = PaTenantDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PaTenantDet.formatFiltered(res.data));
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
            clt_ref_id: d.clt_ref_id,
            tnnt_name: d.tnnt_name,
            abbr: d.abbr,
            database_name: d.database_name,
            user_name: d.user_name,
            admin_password: d.admin_password,
            start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
            end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
            email_from_id: d.email_from_id,
            whatsapp_from_id: d.whatsapp_from_id,
            language_id: d.language_id,
            lc_status_id: d.lc_status_id,
            is_active: d.is_active,
            created_at: d.created_at,
            created_by: d.created_by,

            });
        }
        return formatted;
    },

	getAuditData: (filter) =>
        new Promise(function (resolve, reject) {
        const baseUrl = "/paTenantDet/getAudit";
        const filterUrl = PaTenantDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
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

    getEmail: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/paTenantDet/getEmail";
            const filterUrl = PaTenantDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
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

    getWhattsapp: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/paTenantDet/getWhattsapp";
            const filterUrl = PaTenantDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
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

    getFilterUrl: (filter) => {
        let url = "";

        if (filter !== undefined) {
			if (filter.com_id !== undefined) {
              url += "com_id=" + filter.com_id + "&";
            }
			//param_value

if (filter.id !== undefined) {
    url += "id=" + filter.id + "&";
}
if (filter.intl_id !== undefined) {
    url += "intl_id=" + filter.intl_id + "&";
}
if (filter.clt_ref_id !== undefined) {
    url += "clt_ref_id=" + filter.clt_ref_id + "&";
}
if (filter.tnnt_name !== undefined) {
    url += "tnnt_name=" + filter.tnnt_name + "&";
}
if (filter.abbr !== undefined) {
    url += "abbr=" + filter.abbr + "&";
}
if (filter.database_name !== undefined) {
    url += "database_name=" + filter.database_name + "&";
}
if (filter.user_name !== undefined) {
    url += "user_name=" + filter.user_name + "&";
}
if (filter.admin_password !== undefined) {
    url += "admin_password=" + filter.admin_password + "&";
}
if (filter.start_date !== undefined) {
    url += "start_date=" + filter.start_date + "&";
}
if (filter.end_date !== undefined) {
    url += "end_date=" + filter.end_date + "&";
}
if (filter.email_from_id !== undefined) {
    url += "email_from_id=" + filter.email_from_id + "&";
}
if (filter.whatsapp_from_id !== undefined) {
    url += "whatsapp_from_id=" + filter.whatsapp_from_id + "&";
}
if (filter.language_id !== undefined) {
    url += "language_id=" + filter.language_id + "&";
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
if (filter.ref_id !== undefined) { 
 url += "ref_id=" + filter.ref_id + "&";
}
			//param_value
            
        }
        return url;
    },
};

export default PaTenantDet;