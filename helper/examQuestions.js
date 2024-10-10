import API from "../utils/api";

const question = {
    getWithId: (module_id) =>
        new Promise(function (resolve, reject) {
            API.get("/examQuestion/get?module_id=" + module_id)
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    get: () =>
        new Promise(function (resolve, reject) {
            API.get("/examQuestion/get")
                .then(async (res) => {
                    resolve(res.data);
                    //resolve(question.format(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    getQuestionAnswer: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/examQuestion/getQuestionAnswer";
      const filterUrl = question.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`)
          .then(async (res) => {
            console.log(res.data)
            resolve(res.data);
          })
          .catch((err) => {
              reject(err);
          });
  }),

  getFilterUrl: (filter) => {
      let url = "";

      if (filter !== undefined) {
          if (filter.user_name !== undefined) {
              url += "user_name=" + filter.user_name + "&";
          }
          if (filter.module_id !== undefined) {
              url += "module_id=" + filter.module_id + "&";
          }
          if (filter.exam_date !== undefined) {
            url += "exam_date=" + filter.exam_date + "&";
        }
             if (filter.tnnt_id !== undefined) {
              url += "tnnt_id=" + filter.tnnt_id + "&";
          }
      }
      return url;
  },


    // format: (data) => {
    // 	const formatted = [];

    // 	for (let d of data) {
    // 		formatted.push({
    // 			job_id: d.job_id,
    // 			role: d.role,
    // 			job_description: d.job_description,
    // 			skills_required: d.skills_required,
    // 			is_active: d.is_active == 0 ? false : true,
    // 		});
    // 	}

    // 	return formatted;
    // },
};

export default question;
