import API from "../../utils/api";
import moment from "moment";

const taHomePageDet = {
  insertRecord: (data) =>
    new Promise(function (resolve, reject) {
      API.post("/taHomePageDet/insertRecord", data, {
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
      API.patch("/taHomePageDet/updateRecord", data, {
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
      const baseUrl = "/taHomePageDet/getRecord";
      const filterUrl = taHomePageDet.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(taHomePageDet.formatRecord(res.data));
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
        hosting_date: d.hosting_date,
        banner_1_image: d.banner_1_image,
        banner_2_image: d.banner_2_image,
        banner_3_image: d.banner_3_image,
      });
    }
    return formatted;
  },

  getPageDet: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/taHomePageDet/getPageDet";
      const filterUrl = taHomePageDet.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(taHomePageDet.formatPageDet(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatPageDet: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.id,
        hosting_date: d.hosting_date,
        banner_1_image: d.banner_1_image,
        banner_2_image: d.banner_2_image,
        banner_3_image: d.banner_3_image,
      });
    }
    return formatted;
  },

  getFilteredData: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/taHomePageDet/getFilteredData";
      const filterUrl = taHomePageDet.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`)
        .then(async (res) => {
          resolve(taHomePageDet.formatFiltered(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatFiltered: async (data) => {
    const formatted = [];
    for (let i in data) {
        formatted.push({
            date: moment(data[i].hosting_date).format("DD/MM/YYYY"),
            id: data[i].id,
            banners: [
                {
                    image: data[i].banner_1_image,
                },
                {
                    image: data[i].banner_2_image,
                },
                {
                    image: data[i].banner_3_image,
                },
            ],
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
      //param_value

      if (filter.id !== undefined) {
        url += "id=" + filter.id + "&";
      }
      if (filter.hosting_date !== undefined) {
        url += "hosting_date=" + filter.hosting_date + "&";
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
    }
    return url;
  },
};

export default taHomePageDet;
