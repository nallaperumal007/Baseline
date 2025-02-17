// this source generated by GenAI v2.9.4 
import API from "../../utils/api";

const PfDocMainDet = {

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/pfDocMainDet/insertRecord", data, {
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
            API.patch("/pfDocMainDet/updateRecord", data, {
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
            const baseUrl = "/pfDocMainDet/getRecord";
            const filterUrl = PfDocMainDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PfDocMainDet.formatRecord(res.data));
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
            module_id: d.module_id,
            usecase_name: d.usecase_name,
            page_content_public: d.page_content_public,
            page_content_intern: d.page_content_intern,
            private_access_id: d.private_access_id,
            public_access_id: d.public_access_id,
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
            const baseUrl = "/pfDocMainDet/getPageDet";
            const filterUrl = PfDocMainDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PfDocMainDet.formatPageDet(res.data));
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
            module_id: d.module_id,
            usecase_name: d.usecase_name,
            page_content_public: d.page_content_public,
            page_content_intern: d.page_content_intern,
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
            const baseUrl = "/pfDocMainDet/getAudit";
            const filterUrl = PfDocMainDet.getFilterUrl(filter);
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
            const baseUrl = "/pfDocMainDet/getFilteredData";
            const filterUrl = PfDocMainDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PfDocMainDet.formatFiltered(res.data));
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
            module_id: d.module_id,
            usecase_name: d.usecase_name,
            page_content_public: d.page_content_public,
            page_content_intern: d.page_content_intern,
            lc_status_id: d.lc_status_id,
            is_active: d.is_active,
            created_at: d.created_at,
            created_by: d.created_by,
            tnnt_id: d.tnnt_id,

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
if (filter.module_id !== undefined) {
    url += "module_id=" + filter.module_id + "&";
}
if (filter.usecase_name !== undefined) {
    url += "usecase_name=" + filter.usecase_name + "&";
}
if (filter.page_content_public !== undefined) {
    url += "page_content_public=" + filter.page_content_public + "&";
}
if (filter.page_content_intern !== undefined) {
    url += "page_content_intern=" + filter.page_content_intern + "&";
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

export default PfDocMainDet;