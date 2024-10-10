import API from "../utils/api";

const files = {
    upload: (file, name, folder, type) =>
        new Promise(function (resolve, reject) {
            const formData = new FormData();
            formData.append("file", file, file.name);
            formData.append("name", name);
            formData.append("folder", folder);
            formData.append("type", type == undefined ? "secure" : type);
            API.post("/files", formData)
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

   updateFile: (data) =>
    new Promise(function (resolve, reject) {
      API.patch("/files/updateFile", data, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          console.log(res);
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

    getFile: (file) =>
        new Promise(function (resolve, reject) {
            API.get("/files/getFile?file=" + file, {
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

        getSignedUrl: (file) =>
          new Promise(function (resolve, reject) {
            API.get("/files/getSignedUrl?file=" + file, {
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

  getQrCode: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/files/getQrCode";
      const filterUrl = files.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
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

  insertRecord: (data) =>
    new Promise(function (resolve, reject) {
      API.post("/files/insertRecord", data, {
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

    getFilterUrl: (filter) => {
      let url = "";
  
      if (filter !== undefined) {
        if (filter.name !== undefined) {
          url += "name=" + filter.name + "&";
        }
        if (filter.mobile_no !== undefined) {
          url += "mobile_no=" + filter.mobile_no + "&";
        }
        if (filter.email !== undefined) {
          url += "email=" + filter.email + "&";
        }
        if (filter.design_name !== undefined) {
          url += "design_name=" + filter.design_name + "&";
        }
        if (filter.company_name !== undefined) {
          url += "company_name=" + filter.company_name + "&";
        }
      }
      return url;
    },
};

export default files;
