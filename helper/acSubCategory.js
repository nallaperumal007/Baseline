import API from "../utils/api";

const AcSubCategory = {

   insertRecord: (data) =>
    new Promise(function (resolve, reject) {
        API.post("/acSubCategory/insertRecord", data)
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
        API.patch("/acSubCategory/updateRecord", data)
            .then(async (res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    }),

    get: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/acSubCategory/get";
            const filterUrl = AcSubCategory.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(AcSubCategory.format(res.data));
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
                category_name: d.category_name,
                subcategory_name: d.subcategory_name,
            });
        }
        return formatted;
    },

    getAllActive: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/acSubCategory/getAllActive";
            const filterUrl = AcSubCategory.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(AcSubCategory.format(res.data));
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
                category_name: d.category_name,
                subcategory_name: d.subcategory_name,
            });
        }
        return formatted;
    },

    getFilteredData: (filter) =>
    new Promise(function (resolve, reject) {
        const baseUrl = "/acSubCategory/getFilteredData";
		const filterUrl = AcSubCategory.getFilterUrl(filter);
		API.get(`${baseUrl}?${filterUrl}`)
            .then(async (res) => {
                resolve(AcSubCategory.formatfd(res.data));
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
            category_name: d.category_name,
            subcategory_name: d.subcategory_name
        });
    }
    return formatted;
    },

   getForDropDown: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/acSubCategory/getForDropDown";
            const filterUrl = AcSubCategory.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(AcSubCategory.formatFordd(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    formatFordd: (data) => {
        const formatted = [];
        for (let d of data) {
            formatted.push({
                id: d.sub_category_id,
                name: d.sub_category_name,
            });
        }
        return formatted;
    },

    getFilterUrl: (filter) => {
		let url = "";

		if (filter !== undefined) {
			if (filter.category_id !== undefined) {
				url += "category_id=" + filter.category_id + "&";
			}
            if (filter.tnnt_id !== undefined) {
				url += "tnnt_id=" + filter.tnnt_id + "&";
			}
		}
		return url;
	},
};

export default AcSubCategory;
