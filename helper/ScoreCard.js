import API from "../utils/api";

const ScoreCard = {

    get: () =>
        new Promise(function (resolve, reject) {
            API.get("/scoreCard/get")
                .then(async (res) => {
                    resolve(ScoreCard.format(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    
	format: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.id,
                exam_name: d.exam_name,
                score: d.score,
                total_score: d.tot_score,
                percentage: d.percentage,
                exam_date: d.exam_date
            });
        }
        return formatted;
    },
};

export default ScoreCard;
