import API from "../../utils/api";

const paDashboard = {
  getCSStatsSev: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/paDashboard/getCSStatsSev";
      const filterUrl = paDashboard.getCSStatsSev(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(paDashboard.format(res.data));
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
          tnnt_id: d.tnnt_id,
          period_id:d.period_id,
        });
      }
    return formatted;
  },


  getCSStatsSevT: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/paDashboard/getCSStatsSevT";
      const filterUrl = paDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(paDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          period_id: d.period_id,
          status_id:d.status_id,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getCSStatsStatus: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/paDashboard/getCSStatsStatus";
      const filterUrl = paDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(paDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getCSStatsStatusT: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/paDashboard/getCSStatsStatusT";
      const filterUrl = paDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(paDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getCSStatsPerTenant: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/paDashboard/getCSStatsPerTenant";
      const filterUrl = paDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(paDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },



      
      
   
  
};

export default paDashboard;
