const getDateStr = (date) => date.getFullYear().toString() + "-"
    + (date.getMonth() + 1).toString().padStart(2, "0") + "-"
    + date.getDate().toString().padStart(2, "0");

const randomBuildData = (seed) => {
    let randomData = new Map(), date = new Date("2016-01-01"), dateStr = "";
    for (let i = 0; i < 91; i++) {
        dateStr = getDateStr(date);
        randomData.set(dateStr, Math.ceil(Math.random() * seed));
        date.setDate(date.getDate() + 1);
    }
    return randomData;
}

let aqiSrcData = new Map([
    ["\u5317\u4eac", randomBuildData(500)],
    ["\u4e0a\u6d77", randomBuildData(400)],
    ["\u5e7f\u5dde", randomBuildData(100)],
    ["\u6df1\u5733", randomBuildData(200)]
]);

export { aqiSrcData, getDateStr };