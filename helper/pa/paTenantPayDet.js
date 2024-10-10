import API from "../../utils/api";
import moment from "moment";

const PaTenantPayDet = {

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/paTenantPayDet/insertRecord", data, {
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
            API.patch("/paTenantPayDet/updateRecord", data, {
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
            const baseUrl = "/paTenantPayDet/getRecord";
            const filterUrl = PaTenantPayDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PaTenantPayDet.formatRecord(res.data));
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
            tnnt_id: d.tnnt_id,
            proj_date: d.proj_date == null ? "" : moment(d.proj_date ).format("DD-MMM-YYYY"),
            book_date: d.book_date == null ? "" : moment(d.book_date ).format("DD-MMM-YYYY"),
            pay_amount: d.pay_amount,
            pay_method_id: d.pay_method_id,
            booking_type_id: d.booking_type_id,
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
            const baseUrl = "/paTenantPayDet/getPageDet";
            const filterUrl = PaTenantPayDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PaTenantPayDet.formatPageDet(res.data));
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
            tnnt_id: d.tnnt_id,
            proj_date: d.proj_date == null ? "" : moment(d.proj_date ).format("DD-MMM-YYYY"),
            book_date: d.book_date == null ? "" : moment(d.book_date ).format("DD-MMM-YYYY"),
            pay_amount: d.pay_amount,
            pay_method_id: d.pay_method_id,
            booking_type_id: d.booking_type_id,
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
            const baseUrl = "/paTenantPayDet/getFilteredData";
            const filterUrl = PaTenantPayDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PaTenantPayDet.formatFiltered(res.data));
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
            tnnt_id: d.tnnt_id,
            proj_date: d.proj_date == null ? "" : moment(d.proj_date ).format("DD-MMM-YYYY"),
            book_date: d.book_date == null ? "" : moment(d.book_date ).format("DD-MMM-YYYY"),
            pay_amount: d.pay_amount,
            pay_method_id: d.pay_method_id,
            booking_type_id: d.booking_type_id,
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
        const baseUrl = "/paTenantPayDet/getAudit";
        const filterUrl = PaTenantPayDet.getFilterUrl(filter);
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
if (filter.clt_ref_id !== undefined) {
    url += "clt_ref_id=" + filter.clt_ref_id + "&";
}
if (filter.tnnt_id !== undefined) {
    url += "tnnt_id=" + filter.tnnt_id + "&";
}
if (filter.proj_date !== undefined) {
    url += "proj_date=" + filter.proj_date + "&";
}
if (filter.book_date !== undefined) {
    url += "book_date=" + filter.book_date + "&";
}
if (filter.pay_amount !== undefined) {
    url += "pay_amount=" + filter.pay_amount + "&";
}
if (filter.pay_method_id !== undefined) {
    url += "pay_method_id=" + filter.pay_method_id + "&";
}
if (filter.booking_type_id !== undefined) {
    url += "booking_type_id=" + filter.booking_type_id + "&";
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

export default PaTenantPayDet;