import API from "../utils/api";

const AssetType = {

    get: () =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/assetType/get";
            const filterUrl = AssetType.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(AssetType.format(res.data));
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
                asset_type: d.asset_type,
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

export default AssetType;
