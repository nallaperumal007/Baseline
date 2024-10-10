import API from "../../utils/api";

const PfDdLookup = {


  getStockM1Name: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDdLookup/getStockM1Name";
      const filterUrl = PfDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDdLookup.formatReq(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  getMachineM1Name: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDdLookup/getMachineM1Name";
      const filterUrl = PfDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDdLookup.formatReq(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  getStaffM1Name: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDdLookup/getStaffM1Name";
      const filterUrl = PfDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDdLookup.formatReqStaff(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatReqStaff: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.id,
        name: d.staff_name,
      });
    }
    return formatted;
  },

  getAmountDet: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDdLookup/getAmountDet";
      const filterUrl = PfDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDdLookup.formatAmount(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatAmount: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.id,
        name: d.ord_amt,
      });
    }
    return formatted;
  },

  getCltM1Name: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDdLookup/getCltM1Name";
      const filterUrl = PfDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDdLookup.formatReqClt(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatReqClt: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.id,
        name: d.clt_name,
      });
    }
    return formatted;
  },

  getLcStatus: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDdLookup/getLcStatus";
      const filterUrl = PfDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDdLookup.formatReq(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatReq: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getAddrType: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDdLookup/getAddrType";
      const filterUrl = PfDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDdLookup.formatReq(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatReq: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getFieldList: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDdLookup/getFieldList";
      const filterUrl = PfDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDdLookup.formatReq(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatReq: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getFieldValue: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDdLookup/getFieldValue";
      const filterUrl = PfDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDdLookup.formatReqV(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatReqV: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },


  getModuleId: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDdLookup/getModuleId";
      const filterUrl = PfDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDdLookup.formatReq(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatReq: (data) => {

    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getComId: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDdLookup/getComId";
      const filterUrl = PfDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDdLookup.formatReq(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatReq: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getApiStatus: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDdLookup/getApiStatus";
      const filterUrl = PfDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDdLookup.formatReq(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatReq: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getApiMethod: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDdLookup/getApiMethod";
      const filterUrl = PfDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDdLookup.formatReq(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatReq: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getMsDet: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDdLookup/getMsDet";
      const filterUrl = PfDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDdLookup.formatReq(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  getTicketStatus: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDdLookup/getTicketStatus";
      const filterUrl = PfDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDdLookup.formatReq(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  getTicketSevStatus: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDdLookup/getTicketSevStatus";
      const filterUrl = PfDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDdLookup.formatReq(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatReq: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getPfConstType: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDdLookup/getPfConstType";
      const filterUrl = PfDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDdLookup.formatReq(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatReq: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
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
      if (filter.is_active !== undefined) {
        url += "is_active=" + filter.is_active + "&";
      }
    }
    return url;
  },
};

export default PfDdLookup;
