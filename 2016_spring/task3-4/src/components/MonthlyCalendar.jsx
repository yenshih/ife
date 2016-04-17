import React, { Component, PropTypes } from "react";

class MonthlyCalendar extends Component {
	render() {
		return (
			<div>
                <h6>{year}年{month}月</h6>
                <table>
                    <thead>
                        <tr>
                            <th>日</th>
                            <th>一</th>
                            <th>二</th>
                            <th>三</th>
                            <th>四</th>
                            <th>五</th>
                            <th>六</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => <tr key=`${index}`>
                            {row.map((item, index) => <td key=`${index}`>
                                {item}
                            </td>)}
                        </tr>)}
                    </tbody>
                </table>
            </div>
        );
	}
}