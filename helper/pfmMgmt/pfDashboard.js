import API from "../../utils/api";

const PfDashboard = {
  getLibOrderStats: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getLibOrderStats";
      const filterUrl = PfDashboard.getLibFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.formatLibOrd(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    formatLibOrd: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.count, 0);
  
      for (let d of data) {
        formatted.push({
          ord_status_name: d.ord_status_name,
          count:d.count,
        });
      }
    return formatted;
  },
  getLibOrderTypeStats: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getLibOrderTypeStats";
      const filterUrl = PfDashboard.getLibFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.formatLibOrdType(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    formatLibOrdType: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.count, 0);
  
      for (let d of data) {
        formatted.push({
          ord_type: d.id,
          option_name: d.option_name,
          count:d.count,
        });
      }
    return formatted;
  },  

  getLibOrderStatsUC1: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getLibOrderStats";
      const filterUrl = PfDashboard.getLibFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.formatLibOrdT1(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    formatLibOrdT1: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.count, 0);
  
      for (let d of data) {
        formatted.push({
          ord_status: d.ord_status,
          option_name: d.option_name,
          count:d.count,
        });
      }
    return formatted;
  },  
  

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


  getPortlet2: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet2";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet3: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet3";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet4: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet4";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet5: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet5";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet6: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet6";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet7: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet7";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet8: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet8";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet9: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet9";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet10: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet10";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet11: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet11";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet12: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet12";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet13: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet13";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet14: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet14";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet15: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet15";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet16: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet16";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet17: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet17";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet18: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet18";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet19: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet19";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet20: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet20";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet21: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet21";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet22: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet22";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet23: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet23";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet24: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet24";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet25: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet25";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet26: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet26";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet27: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet27";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet28: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet28";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet29: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet29";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet30: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet30";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet31: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet31";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format31(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format31: (data) => {
      const formatted = [];
      // const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        // const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          yet_to_start: d.yet_to_start,
          in_progress:d.in_progress,
          for_review: d.for_review,
          done: d.done,
          discard: d.discard,
          on_hold: d.on_hold,
          blocked: d.blocked,
        });
      }
      
    return formatted;
  },

  getPortlet32: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet32";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format32(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format32: (data) => {
      const formatted = [];

      for (let d of data) {
        // const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          yet_to_start: d.yet_to_start,
          in_progress:d.in_progress,
          for_review: d.for_review,
          done: d.done,
          discard: d.discard,
          on_hold: d.on_hold,
          blocked: d.blocked,
  
        });
      }
    return formatted;
  },

  getPortlet33: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet33";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format33(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    format33: (data) => {
      const formatted = [];
      // const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        // const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          total_stalls: d.total_stalls,
          total_contracts_signed: d.total_contracts_signed,
          total_contracts_wip: d.total_contracts_wip,
          total_payment_collected: d.total_payment_collected,
  
        });
      }
    return formatted;
  },

  getPortlet34: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet34";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format34(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format34: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + parseInt(d.tot), 0);
  
      for (let d of data) {
        const percentage = (d.tot/ totalCount) * 100;
        
        formatted.push({
          state_id: d.state_id,
          state_name: d.state_name,
          tot:d.tot,
          percentage:percentage.toFixed(2) + '%',
          totalCount: totalCount,
        });
      }
    return formatted;
  },

  getPortlet35: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet35";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet36: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet36";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format36(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format36: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.tot, 0);
      for (let d of data) {
        const percentage = (d.count/ totalCount) * 100;
        formatted.push({
          tot: d.tot,
          country_id: d.country_id,
          country_name: d.country_name,
          totalCount: totalCount,
        });
      }
    return formatted;
  },

  getPortlet37: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet37";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format37(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format37: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + parseInt(d.count), 0);
      for (let d of data) {
        const percentage = (d.count/ totalCount) * 100;
        formatted.push({
          yes: d.yes,
          no:d.no,
          count:d.count,
          Percentage:percentage.toFixed(2) + '%',
          totalCount: totalCount,
        });
      }
    return formatted;
  },

  getPortlet38: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet38";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format38(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    format38: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          day: d.day,
          raised: d.raised,
          closed: d.closed,
          outstanding: d.outstanding,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
        });
      }
    return formatted;
  },

  getPortlet39: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet39";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format39(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    format39: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          assigned_to: d.assigned_to,
          count:d.count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet40: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet40";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format40(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    format40: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          status: d.status,
          count:d.count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet41: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet41";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format41(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    format41: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          ticket_id: d.ticket_id,
          age:d.age,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet42: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet42";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format42(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format42: (data) => {
      const formatted = [];
      
      const totalCount = data.reduce((sum, d) => sum + parseInt(d.total), 0);

      for (let d of data) {
        const percentage = (d.total/ totalCount) * 100;
        formatted.push({
          status: d.status,
          total:d.total,
          sq_meter: d.sq_meter,
          percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet43: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet43";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format43(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format43: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.contract_count, 0);
  
      for (let d of data) {
     
        const percentage = (d.contract_count/ totalCount) *100 ;
        formatted.push({
          stage_id: d.stage_id,
          stage_name: d.stage_name,
          contract_count: d.contract_count,
          stall_size: d.stall_size,  
          percentage: percentage,
        });
      }
    return formatted;
  },

  getPortlet44: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet44";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format44(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format44: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          status: d.status,
          total:d.total,
          sq_meter: d.sq_meter,
          percentage:d.percentage,
  
        });
      }
    return formatted;
  },

  getPortlet45: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet45";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format45(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format45: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          status: d.status,
          total:d.total,
          sq_meter: d.sq_meter,
          percentage:d.percentage,
  
        });
      }
    return formatted;
  },

  getPortlet46: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet46";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format46(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format46: (data) => {
      const formatted = [];
      for (let d of data) {
        formatted.push({
          count_email: d.count_email,
          count_wapp:d.count_wapp,
          count_unsubscribed:d.count_unsubscribed,
  
        });
      }
    return formatted;
  },

  getPortlet47: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet47";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet48: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet48";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet49: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet49";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet50: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet50";
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
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet51: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet51";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format51(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    format51: (data) => {
      const formatted = [];
  
      for (let d of data) {
        formatted.push({
          stage_id: d.stage_id,
          stage_name: d.stage_name,
          fdp: d.fdp,
          idp: d.idp,
          fc: d.fc,
          ifp: d.ifp,
          btf: d.btf,
          total_per_stage: d.total_per_stage,
          total_stall_size: d.total_stall_size,
        });
      }
    return formatted;
  },

  getPortlet52: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet52";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format52(res.data));
          // resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    }),

    format52: (data) => {
      const formatted = [];
      
      const totalCount = data.reduce((sum, d) => sum + parseInt(d.total), 0);

      for (let d of data) {
        const percentage = (d.total/ totalCount) * 100;
        formatted.push({
          status: d.status,
          total: d.total,
          sq_meter: d.sq_meter,
          percentage: percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },


  getExhibDocmStats: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getExhibDocmStats";
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
        formatted.push({
          file_logo: d.file_logo,
          file_product_catalogue: d.file_product_catalogue,
          file_promo_flier: d.file_promo_flier,
          file_ad_design: d.file_ad_design,
          file_promo_videos: d.file_promo_videos,
          file_stand_design: d.file_stand_design,
        });
      }
    return formatted;
  },

  getLibStockStatus: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getLibStockStatus";
      const filterUrl = PfDashboard.getLibFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.formatLibStatus(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    formatLibStatus: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.count, 0);
  
      for (let d of data) {
        formatted.push({
          com_name: d.com_name,
          com_count:d.com_count,
        });
      }
    return formatted;
  }, 

  getLibStockConsultant: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getLibStockConsultant";
      const filterUrl = PfDashboard.getLibFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.formatLibOrdT(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    formatLibOrdT: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.count, 0);
  
      for (let d of data) {
        formatted.push({
          option_name: d.option_name,
          count:d.count,
        });
      }
    return formatted;
  }, 

  getLibStockCostDetails: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getLibStockCostDetails";
      const filterUrl = PfDashboard.getLibFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.formatCostDet(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    formatCostDet: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.count, 0);
  
      for (let d of data) {
        formatted.push({
          cost_name: d.cost_name,
          cost_amount:d.cost_amount,
        });
      }
    return formatted;
  }, 

  getLibFilterUrl: (filter) => {
    let url = "";

    if (filter !== undefined) {
      if (filter.tnnt_id !== undefined) {
        url += "tnnt_id=" + filter.tnnt_id + "&";
      }
      if (filter.user_name !== undefined) {
        url += "user_name=" + filter.user_name + "&";
      }
      if (filter.uc_id !== undefined) {
        url += "uc_id=" + filter.uc_id + "&";
      }
    }
    return url;
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
