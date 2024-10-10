import API from "../utils/api"; 

const libStatusDash = {
  getOrderStatus: () =>
    new Promise((resolve, reject) => {
      API.get('/order-status')
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.data.msg || 'Error fetching order status');
          }
        })
        .catch((err) => {
          reject(err.message || 'Error fetching order status');
        });
    }),

  getOrderType: () =>
    new Promise((resolve, reject) => {
      API.get('/order-type')
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.data.msg || 'Error fetching order type');
          }
        })
        .catch((err) => {
          reject(err.message || 'Error fetching order type');
        });
    }),
};

export default libStatusDash;
