import API from "../utils/api";

const AssetDetails = {

    get: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/amAssetDetails/get";
        const filterUrl = AssetDetails.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(AssetDetails.format(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

	format: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                tag_id: d.tag_id,
                asset_group_id: d.asset_group_id,
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

export default AssetDetails;
