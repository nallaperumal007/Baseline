import API from "../../utils/api";

const PfDashboard = {
  getPortlet1: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet1";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        formatted.push({
          Employment_Type: d.Employment_Type,
          Head_Count:d.Head_Count,
        });
      }
    return formatted;
  },

  getCSStatsSev: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/paTnntDashboard/getCSStatsSev";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.formatDocm(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    formatDocm: (data) => {
      const formatted = [];
  
      for (let d of data) {
        console.log(data)
        formatted.push({
            Severity: d.Severity,
            total: d.total,
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
      if (filter.user_name !== undefined) {
        url += "user_name=" + filter.user_name + "&";
      }
      if (filter.proj_id !== undefined) {
        url += "proj_id=" + filter.proj_id + "&";
      }
      if (filter.com_id !== undefined) {
        url += "com_id=" + filter.com_id + "&";
      }
    }
    return url;
  },
};

export default PfDashboard;
