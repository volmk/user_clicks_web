import React from 'react'
import Chart from "react-google-charts"
import Loading from "./Loading"
import '../styles/Plot.scss'
import {stringToDate, dateToString} from "../../utils/dateString";

const prepareData = (min, max, array) => {
    // [0] - date, [1] - value
    let curr = min
    const res = [array.shift()]
    while (curr <= max){
        const currStr = dateToString(curr)
        if (array.length && array[0][0] === currStr){
            res.push(array.shift())
        } else {
            res.push([currStr,0])
        }
        curr.setDate(curr.getDate() + 1)
    }
    return res
}

function Plot({min, max, data, label}) {
    min = stringToDate(min)
    max = stringToDate(max)
    data = prepareData(min, max, data)

    const options = {
        curveType: 'function',
        intervals: {style: 'line'},
        height: '350px',
        fontSize: '16px',
        fontName: 'Montserrat',
        pointSize: 16,
        legend: 'none',
        colors: ['#3A80BA'],
        chartArea: {
            height: '85%',
            width: '100%',
            top: 30,
            left: 50,
        },
        hAxis: {
            viewWindow: {min, max},
            textStyle: {
                color: '#CCCCCC',
                fontSize: '16px',
                bold: false,
                fontName: 'Montserrat',
                height: '30px'
            },
            gridlines: {
                color: '#FFFFFF',
                count: Math.ceil((data.length - 1) / 60) * 5,
            },
            slantedText: false,
        },
        vAxis: {
            format: '####',
            viewWindow: {min: -50, max: 1050},
            textStyle: {
                color: '#CCCCCC',
                fontSize: '16px',
                bold: false,
                fontName: 'Montserrat',
                height: '30px'
            },
            gridlines: {
                color: '#F1F1F1',
                count: 0.5,
                minSpacing: 50,
            },
            baselineColor: '#F1F1F1',
        },
        series: {
            0: {
                lineWidth: 4,
                pointSize: 0,
            },
            1: {
                pointShape: 'circle'
            },
        },
    }

    return (
        <div className='plot'>
            <h2 className='plot__title'>{label}</h2>
            <Chart
                chartType="LineChart"
                loader={<Loading/>}
                data={data}
                options={options}
            />
        </div>
    )
}

export default Plot