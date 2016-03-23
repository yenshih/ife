import { aqiSrcData, getDateStr } from "./random";

const aqiChart = document.getElementById("aqi-chart");

const RenderChart = {
    render(gra, city) {
        let chart = "";
        const getLevel = (aqi) => {
            let level;
            switch (true) {
                case aqi <= 50: level = 1; break;
                case aqi > 50 && aqi <= 100: level = 2; break;
                case aqi > 100 && aqi <= 150: level = 3; break;
                case aqi > 150 && aqi <= 200: level = 4; break;
                case aqi > 200 && aqi <= 300: level = 5; break;
                case aqi > 300: level = 6; break;
            }
            return level;
        }, begin = "2016-01-01", end = "2016-03-31";
        switch (gra) {
            case "day":
                for (let [date, aqi] of aqiSrcData.get(city).entries()) {
                    chart += `<div title="${date}, ${aqi}" class="level${getLevel(aqi)} day" style="height: ${aqi}px;"></div>`;
                }
                break;
            case "week": {
                const beginDate = new Date(begin), endDate = new Date(end),
                    beginTime = beginDate.getTime(), adjust = (7 - beginDate.getDay()) % 7,
                    totalDays = Math.round((endDate.getTime() - beginTime) / 86400000) + 1;
                let date = new Date(begin), week,
                    avg = new Array(Math.ceil((totalDays - adjust) / 7) + 1).fill(0),
                    num = new Array(Math.ceil((totalDays - adjust) / 7) + 1).fill(0);
                for (let i = 1; i <= totalDays; i++) {
                    week = Math.ceil((i - adjust) / 7);
                    avg[week] += aqiSrcData.get(city).get(getDateStr(date));
                    num[week]++;
                    date.setDate(date.getDate() + 1);
                }
                avg = avg.map((element, index) => num[index] ? Math.round(element / num[index]) : 0);
                date = new Date(begin);
                if (adjust) {
                    let temp = new Date(date);
                    temp.setDate(beginDate.getDate() + adjust - 1);
                    chart += `<div title="${getDateStr(beginDate)} ~ ${getDateStr(temp)}, ${avg[0]}" class="level${getLevel(avg[0])} week" style="height: ${avg[0]}px;"></div>`;
                }
                date.setDate(beginDate.getDate() + adjust);
                for (let i = 1; i < week; i++) {
                    let temp = new Date(date);
                    temp.setDate(date.getDate() + 6);
                    chart += `<div title="${getDateStr(date)} ~ ${getDateStr(temp)}, ${avg[i]}" class="level${getLevel(avg[i])} week" style="height: ${avg[i]}px;"></div>`;
                    date.setDate(date.getDate() + 7);
                }
                if (date.getDate() <= endDate.getDate()) {
                    chart += `<div title="${getDateStr(date)} ~ ${getDateStr(endDate)}, ${avg[week]}" class="level${getLevel(avg[week])} week" style="height: ${avg[week]}px;"></div>`;
                }
                break;
            }
            case "month": {
                const calendar = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                    beginDate = new Date(begin), endDate = new Date(end),
                    beginMonth = beginDate.getMonth(), endMonth = endDate.getMonth(),
                    totalDays = Math.round((endDate.getTime() - beginDate.getTime()) / 86400000) + 1;
                let date = new Date(begin), month,
                    avg = new Array(endMonth - beginMonth + 1).fill(0),
                    num = new Array(endMonth - beginMonth + 1).fill(0);
                for (let i = 0; i < totalDays; i++) {
                    month = date.getMonth();
                    avg[month] += aqiSrcData.get(city).get(getDateStr(date));
                    num[month]++;
                    date.setDate(date.getDate() + 1);
                }
                avg = avg.map((element, index) => num[index] ? Math.round(element / num[index]) : 0);
                date = new Date(begin);
                for (let i = beginMonth; i <= endMonth; i++) {
                    chart += `<div title="${getDateStr(date).replace(/-\d+$/g, "")}, ${avg[i]}" class="level${getLevel(avg[i])} month" style="height: ${avg[i]}px;"></div>`;
                    date.setDate(date.getDate() + calendar[date.getMonth()]);
                    if (i === 2) {
                        let year = date.getFullYear();
                        if (!(year & 3) && ((year % 100) || !(year % 400))) {
                            date.setDate(date.getDate() + 1);
                        }
                    }
                }
                break;
            }
        }
        aqiChart.innerHTML = chart;
    }
};

export default RenderChart;