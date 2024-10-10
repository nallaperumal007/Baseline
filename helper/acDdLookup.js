import API from "../utils/api";

const AcDdLookup = {
  getAcWebinarStatus: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/acDdLookup/getAcWebinarStatus";
      const filterUrl = AcDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`,{
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(AcDdLookup.formatAcWebinarStatus(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatAcWebinarStatus: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getAcWebinar: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/acDdLookup/getAcWebinar";
      const filterUrl = AcDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`)
        .then(async (res) => {
          resolve(AcDdLookup.formatAcWebinar(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatAcWebinar: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getParticipantGrp: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/acDdLookup/getParticipantGrp";
      const filterUrl = AcDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`)
        .then(async (res) => {
          resolve(AcDdLookup.formatParticipantGrp(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatParticipantGrp: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getCategoryName: (filter) =>
  new Promise(function (resolve, reject) {
    const baseUrl = "/acDdLookup/getCategoryName";
    const filterUrl = AcDdLookup.getFilterUrl(filter);
    API.get(`${baseUrl}?${filterUrl}`,{
      headers: {
        "x-access-token": global.config.accessToken,
      },
    })
    .then(async (res) => {
      resolve(AcDdLookup.formatCategoryName(res.data));
    })
        .catch((err) => {
          reject(err);
        });
    }),

    formatCategoryName: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getSubCategoryName: (filter) =>
  new Promise(function (resolve, reject) {
    const baseUrl = "/acDdLookup/getSubCategoryName";
    const filterUrl = AcDdLookup.getFilterUrl(filter);
    API.get(`${baseUrl}?${filterUrl}`,{
      headers: {
        "x-access-token": global.config.accessToken,
      },
    })
    .then(async (res) => {
      resolve(AcDdLookup.formatSubCategoryName(res.data));
    })
        .catch((err) => {
          reject(err);
        });
    }),

    formatSubCategoryName: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getCourseName: (filter) =>
  new Promise(function (resolve, reject) {
    const baseUrl = "/acDdLookup/getCourseName";
    const filterUrl = AcDdLookup.getFilterUrl(filter);
    API.get(`${baseUrl}?${filterUrl}`,{
      headers: {
        "x-access-token": global.config.accessToken,
      },
    })
    .then(async (res) => {
      resolve(AcDdLookup.formatCourseName(res.data));
    })
        .catch((err) => {
          reject(err);
        });
    }),

    formatCourseName: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getSkillSetName: (filter) =>
  new Promise(function (resolve, reject) {
    const baseUrl = "/acDdLookup/getSkillSetName";
    const filterUrl = AcDdLookup.getFilterUrl(filter);
    API.get(`${baseUrl}?${filterUrl}`,{
      headers: {
        "x-access-token": global.config.accessToken,
      },
    })
    .then(async (res) => {
      resolve(AcDdLookup.formatSkillSetName(res.data));
    })
        .catch((err) => {
          reject(err);
        });
    }),

    formatSkillSetName: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getSkillName: (filter) =>
  new Promise(function (resolve, reject) {
    const baseUrl = "/acDdLookup/getSkillName";
    const filterUrl = AcDdLookup.getFilterUrl(filter);
    API.get(`${baseUrl}?${filterUrl}`,{
      headers: {
        "x-access-token": global.config.accessToken,
      },
    })
    .then(async (res) => {
      resolve(AcDdLookup.formatSkillName(res.data));
    })
        .catch((err) => {
          reject(err);
        });
    }),

    formatSkillName: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getUsDocuStatus: (filter) =>
  new Promise(function (resolve, reject) {
    const baseUrl = "/acDdLookup/getUsDocuStatus";
    const filterUrl = AcDdLookup.getFilterUrl(filter);
    API.get(`${baseUrl}?${filterUrl}`,{
      headers: {
        "x-access-token": global.config.accessToken,
      },
    })
    .then(async (res) => {
      resolve(AcDdLookup.formatUsDocuStatus(res.data));
    })
        .catch((err) => {
          reject(err);
        });
    }),

    formatUsDocuStatus: (data) => {
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
      if (filter.status_id !== undefined) {
        url += "status_id=" + filter.status_id + "&";
      }
    }
    return url;
  },
};

export default AcDdLookup;
