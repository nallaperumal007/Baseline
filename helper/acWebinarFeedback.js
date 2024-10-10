import API from "../../utils/api";

const AcWebinarFeedback = {
  insertRecord: (data) =>
    new Promise(function (resolve, reject) {
      API.post("/acWebinarFeedback/insertRecord", data)
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
      API.patch("/acWebinarFeedback/updateRecord", data)
        .then(async (res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    }),

  getRecord: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/acWebinarFeedback/getRecord";
      const filterUrl = AcWebinarFeedback.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`)
        .then(async (res) => {
          resolve(AcWebinarFeedback.formatRecord(res.data));
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
        webinar_id: d.webinar_id,
        participant_name: d.participant_name,
        satisfy_score: d.satisfy_score,
        present_rate1: d.present_rate1,
        present_rate2: d.present_rate2,
        course1_resp: d.course1_resp,
        course2_resp: d.course2_resp,
        course3_resp: d.course3_resp,
        course4_resp: d.course4_resp,
        internship1_resp: d.internship1_resp,
        internship2_resp: d.internship2_resp,
        internship3_resp: d.internship3_resp,
        internship4_resp: d.internship4_resp,
        email_id: d.email_id,
        mobile_nr: d.mobile_nr,
        is_active: d.is_active
      });
    }
    return formatted;
  },

  getPageDet: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/acWebinarFeedback/getPageDet";
      const filterUrl = AcWebinarFeedback.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`)
        .then(async (res) => {
          resolve(AcWebinarFeedback.formatPageDet(res.data));
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
        participant_name: d.participant_name,
        course1_resp: d.course1_resp,
        course2_resp: d.course2_resp,
        course3_resp: d.course3_resp,
        course4_resp: d.course4_resp,
        internship1_resp: d.internship1_resp,
        internship2_resp: d.internship2_resp,
        internship3_resp: d.internship3_resp,
        internship4_resp: d.internship4_resp,
        is_active: d.is_active,
        comment_cnt: d.comment_cnt == null ? 0 : d.comment_cnt,
      });
    }
    return formatted;
  },

  getFilteredData: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/acWebinarFeedback/getFilteredData";
      const filterUrl = AcWebinarFeedback.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`)
        .then(async (res) => {
          resolve(AcWebinarFeedback.formatFiltered(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatFiltered: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.id,
        participant_name: d.participant_name,
        satisfy_score: d.satisfy_score,
        present_rate1: d.present_rate1,
        present_rate2: d.present_rate2,
        course1_resp: d.course1_resp,
        course2_resp: d.course2_resp,
        course3_resp: d.course3_resp,
        course4_resp: d.course4_resp,
        internship1_resp: d.internship1_resp,
        internship2_resp: d.internship2_resp,
        internship3_resp: d.internship3_resp,
        internship4_resp: d.internship4_resp,
        email_id: d.email_id,
        mobile_nr: d.mobile_nr,
        is_active: d.is_active
      });
    }
    return formatted;
  },

  getFilterUrl: (filter) => {
    let url = "";

    if (filter !== undefined) {
      if (filter.id !== undefined) {
        url += "id=" + filter.id + "&";
      }
      if (filter.is_active !== undefined) {
        url += "is_active=" + filter.is_active + "&";
      }
      if (filter.tnnt_id !== undefined) {
        url += "tnnt_id=" + filter.tnnt_id + "&";
      }
      if (filter.com_id !== undefined) {
        url += "com_id=" + filter.com_id + "&";
      }
    }
    return url;
  },
};

export default AcWebinarFeedback;
