import API from "../utils/api";

const AcCourse = {

    get: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/acCourse/get";
            const filterUrl = AcCourse.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(AcCourse.format(res.data));
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
                course_id: d.course_id,
                course_name: d.course_name,
                subcategory_name: d.subcategory_name,
            });
        }

        return formatted;
    },

    getFilterUrl: (filter) => {
        let url = "";

		if (filter !== undefined) {
			if (filter.sub_category_id !== undefined) {
                                url += "sub_category_id=" + filter.sub_category_id + "&";
                        }
			if (filter.tnnt_id !== undefined) {
				url += "tnnt_id=" + filter.tnnt_id + "&";
			}
                  
		}
		return url;
	},
};

export default AcCourse;
