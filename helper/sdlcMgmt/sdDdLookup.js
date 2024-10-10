import API from "../../utils/api";

const SdDdLookup = {

    getSdImpStatus: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/sdDdLookup/getSdImpStatus";
      const filterUrl = SdDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(SdDdLookup.formatReq(res.data));
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

      getModuleName: (filter) =>
        new Promise(function (resolve, reject) {
          const baseUrl = "/sdDdLookup/getModuleName";
          const filterUrl = SdDdLookup.getFilterUrl(filter);
          API.get(`${baseUrl}?${filterUrl}`, {
            headers: {
              "x-access-token": global.config.accessToken,
            },
          })
            .then(async (res) => {
              resolve(SdDdLookup.formatReq(res.data));
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

          getForDropDown: (filter) =>
            new Promise(function (resolve, reject) {
              const baseUrl = "/sdDdLookup/getForDropDown";
              const filterUrl = SdDdLookup.getFilterUrl(filter);
              API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                  "x-access-token": global.config.accessToken,
                },
              })
                .then(async (res) => {
                  resolve(SdDdLookup.formatReq(res.data));
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

              getUserstoryName: (filter) =>
                new Promise(function (resolve, reject) {
                  const baseUrl = "/sdDdLookup/getUserstoryName";
                  const filterUrl = SdDdLookup.getFilterUrl(filter);
                  API.get(`${baseUrl}?${filterUrl}`, {
                    headers: {
                      "x-access-token": global.config.accessToken,
                    },
                  })
                    .then(async (res) => {
                      resolve(SdDdLookup.formatReq(res.data));
                    })
                    .catch((err) => {
                      reject(err);
                    });
                }),

                formatReq: (data) => {
                  console.log(data)
                    const formatted = [];
                
                    for (let d of data) {
                      formatted.push({
                        id: d.rec_id,
                        name: d.rec_name,
                      });
                    }
                    return formatted;
                  },


                  getTestCycleName: (filter) =>
                    new Promise(function (resolve, reject) {
                      const baseUrl = "/sdDdLookup/getTestCycleName";
                      const filterUrl = SdDdLookup.getFilterUrl(filter);
                      API.get(`${baseUrl}?${filterUrl}`, {
                        headers: {
                          "x-access-token": global.config.accessToken,
                        },
                      })
                        .then(async (res) => {
                          resolve(SdDdLookup.formatReq(res.data));
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
      if (filter.status_id !== undefined) {
        url += "status_id=" + filter.status_id + "&";
      }
    }
    return url;
  },
};

export default SdDdLookup;
