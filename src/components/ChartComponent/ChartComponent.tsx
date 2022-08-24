import './ChartComponent.scss';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import CircularProgress from '@mui/material/CircularProgress';
import { TChartComponentProps } from '../../types/data';

const ChartComponent: React.FC<TChartComponentProps> = ({
  chartData, 
  periodValue,
  toValue
}) => {

    if (!chartData) {
        return <CircularProgress  />
    }

    let labelsArray = Object.keys(chartData);
    let currencyArray = [periodValue];

    for (let i = 0; i < labelsArray.length; i++) {
        labelsArray[i] = labelsArray[i].slice(5);
    }
    
    for (let i = 0; i < periodValue; i++) {
        currencyArray[i] = Object.entries(chartData)[i][1][toValue];
    }

    const data = {
        labels: labelsArray,
        datasets: [{      
            data: currencyArray,
            backgroundColor: [
                'rgb(255, 255, 255)',
            ],
            borderColor: [
                'black'
            ],
            
            borderWidth: 1,
        }],
      };

    const options = {
      plugins: {
        legend: {
          display: false
        }
      },
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

      const optionsMobile = {
        elements: {
          point:{
              radius: 0
          }
      },
        plugins: {
          legend: {
            display: false
          }
        },
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
          {periodValue < 60 
          ? <Chart type='line' 
            data={data} 
            datasetIdKey='id' 
            options={options}/> 
            : <Chart type='line' 
            data={data} 
            datasetIdKey='id' 
            options={optionsMobile}/>}
            
        </div>
    )
}

export default ChartComponent;