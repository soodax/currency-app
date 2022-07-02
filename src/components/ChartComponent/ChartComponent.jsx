import './ChartComponent.scss';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const ChartComponent = ({
  chartData, 
  periodValue
}) => {


    if (!chartData) {
        return <div>loading...</div>
    }

    let valuesArray = Object.entries(chartData);
  //   console.log('valuesArray')
  //  console.log(valuesArray)

    // if (valuesArray.length-1 != periodValue) {
    //   return <div>loading...</div>
    // }

    let labelsArray = Object.keys(chartData);
    for (let i = 0; i < labelsArray.length; i++) {
        labelsArray[i] = labelsArray[i].slice(5);
    }
    
    
    let currencyArray = [periodValue];

    // console.log(`${valuesArray.length-1} \ ${periodValue}`);
    for (let i = 0; i < periodValue; i++) {
        currencyArray[i] = valuesArray[i][1].RUB;
    }
    // console.log(periodValue)
    // console.log(currencyArray)

    const data = {
        labels: labelsArray,
        datasets: [{
            label: 'USD/RUB month chart',
            data: currencyArray,
            backgroundColor: [
                'rgb(255, 255, 255)',
            ],
            borderColor: [
                'black',
            ],
            borderWidth: 1,
        }],
      };

    const options = {
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              display: false
            }
          }
        },
      }

    return (
        <div>
            <Chart type='line' data={data} datasetIdKey='id' options={options}/>
        </div>
    )
}

export default ChartComponent;