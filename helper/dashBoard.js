import API from "../../utils/api";

const dashBoard = {
    get: () =>
    new Promise(function (resolve, reject) {
        console.log(filter)
        const baseUrl = "/dashBoard/get";
        // const filterUrl = dashBoard.getFilterUrl(filter);
        API.get(`${baseUrl}`)
            .then(async (res) => {
                console.log(res.data)
                resolve(dashBoard.format(res.data));
            })
            .catch((err) => {
                reject(err);
            });
    }),

    format: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                status: d.status,
                status_count:d.status_count,


            });
        }
        return formatted;
    },
}
export default dashBoard;