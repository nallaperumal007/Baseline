import API from "../utils/api";

const AssetGroup = {

    get: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/amAssetGroup/get";
            const filterUrl = AssetGroup.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(AssetGroup.format(res.data));
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

export default AssetGroup;
