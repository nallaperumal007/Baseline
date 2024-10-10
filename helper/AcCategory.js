import API from "../utils/api";

const AcCategory = {

    get: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/acCategory/get";
            const filterUrl = AcCategory.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(AcCategory.format(res.data));
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
                name: d.name,
            });
        }

        return formatted;
    },
    
    getForDropDown: (filter)  =>
       new Promise(function (resolve, reject) {
        const baseUrl = "/acCategory/getForDropDown";
        const filterUrl = AcCategory.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(AcCategory.formatFordd(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
       }),
        formatFordd: (data) => {
        const formatted = [];
        for (let d of data) {
            formatted.push({
                id: d.category_id,
                name: d.category_name,
         });
        }
        return formatted;
    },
    
    getFilterUrl: (filter) => {
        let url = "";

		if (filter !== undefined) {
			if (filter.tnnt_id !== undefined) {
				url += "tnnt_id=" + filter.tnnt_id + "&";
			}
                  
		}
		return url;
	},
};

export default AcCategory;
