import API from "../utils/api";

const TrDdLookup = {
  getCurrency: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/trDdLookup/getCurrency";
      const filterUrl = TrDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(TrDdLookup.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),
  getPayMode: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/trDdLookup/getPayMode";
      const filterUrl = TrDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(TrDdLookup.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),
    getPayType: (filter) =>
      new Promise(function (resolve, reject) {
        const baseUrl = "/trDdLookup/getPayType";
        const filterUrl = TrDdLookup.getFilterUrl(filter);
        API.get(`${baseUrl}?${filterUrl}`, {
          headers: {
            "x-access-token": global.config.accessToken,
          },
        })
          .then(async (res) => {
            resolve(TrDdLookup.format(res.data));
          })
          .catch((err) => {
            reject(err);
          });
      }),

  getTrDesignType: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/trDdLookup/getTrDesignType";
      const filterUrl = TrDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(TrDdLookup.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
    const formatted = [];
    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getTrAddrType: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/trDdLookup/getTrAddrType";
      const filterUrl = TrDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(TrDdLookup.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getTrIdProofType: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/trDdLookup/getTrIdProofType";
      const filterUrl = TrDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(TrDdLookup.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getTrClientType: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/trDdLookup/getTrClientType";
      const filterUrl = TrDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(TrDdLookup.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getTrPayStatusType: (filter) =>
  new Promise(function (resolve, reject) {
    const baseUrl = "/trDdLookup/getTrPayStatusType";
    const filterUrl = TrDdLookup.getFilterUrl(filter);
    API.get(`${baseUrl}?${filterUrl}`, {
      headers: {
        "x-access-token": global.config.accessToken,
      },
    })
      .then(async (res) => {
        resolve(TrDdLookup.format(res.data));
      })
      .catch((err) => {
        reject(err);
      });
  }),

format: (data) => {
  const formatted = [];

  for (let d of data) {
    formatted.push({
      id: d.rec_id,
      name: d.rec_name,
    });
  }
  return formatted;
},

getTrAttendanceType: (filter) =>
  new Promise(function (resolve, reject) {
    const baseUrl = "/trDdLookup/getTrAttendanceType";
    const filterUrl = TrDdLookup.getFilterUrl(filter);
    API.get(`${baseUrl}?${filterUrl}`, {
      headers: {
        "x-access-token": global.config.accessToken,
      },
    })
      .then(async (res) => {
        resolve(TrDdLookup.format(res.data));
      })
      .catch((err) => {
        reject(err);
      });
  }),

format: (data) => {
  
  const formatted = [];

  for (let d of data) {
    formatted.push({
      id: d.rec_id,
      name: d.rec_name,
    });
  }
  return formatted;
},

getTrOrderStatusType: (filter) =>
new Promise(function (resolve, reject) {
  const baseUrl = "/trDdLookup/getTrOrderStatusType";
  const filterUrl = TrDdLookup.getFilterUrl(filter);
  API.get(`${baseUrl}?${filterUrl}`, {
    headers: {
      "x-access-token": global.config.accessToken,
    },
  })
    .then(async (res) => {
      resolve(TrDdLookup.format(res.data));
    })
    .catch((err) => {
      reject(err);
    });
}),

format: (data) => {
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

export default TrDdLookup;
