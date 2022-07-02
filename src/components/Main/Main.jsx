import './Main.scss';
import * as axios from 'axios';
import { useEffect, useState } from 'react';
import ConvertForm from '../ConvertForm/ConvertForm';
import clear_icon from '../../assets/images/clear.png';
import switch_icon from '../../assets/images/switch.png';
import ChartComponent from '../ChartComponent/ChartComponent';

const Main = (props) => {
    const [valuesArray, setValuesArray] = useState();
    const [fromValue, setFromValue] = useState('USD');
    const [toValue, setToValue] = useState('RUB');
    const [currentAmount, setCurrentAmount] = useState(0);
    const [resultAmount, setResultAmount] = useState(0);
    const [currentDate, setCurrentDate] = useState();
    const [selectedValue, setSelectedValue] = useState();
    const [chartData, setChartData] = useState();
    const [periodValue, setPeriodValue] = useState(30);


    // const getPeriodArray = () => {
    //     console.log('get')
    //     let currentMonth = new Date;
    //     let copyMonth = new Date;
    //     let previousMonth = copyMonth.setDate(copyMonth.getDate() - periodValue+1);
    //     let previousDate = new Date(previousMonth);
    //     axios.get(`https://api.exchangerate.host/timeseries?start_date=${previousDate.getFullYear()}-0${previousDate.getMonth() + 1}-${previousDate.getDate()}&end_date=${currentMonth.getFullYear()}-0${currentMonth.getMonth() + 1}-${currentMonth.getDate()}&base=USD`).then(response => {
    //         setChartData(response.data.rates)


    //     })
    // }


    useEffect(() => {
        // let currentMonth = new Date;
        // let copyMonth = new Date;
        // let previousMonth = copyMonth.setDate(copyMonth.getDate() - periodValue)

        // let previousDate = new Date(previousMonth)
        let currentMonth = new Date;
        let copyMonth = new Date;
        console.log(periodValue)
        let previousMonth = copyMonth.setDate(copyMonth.getDate() - 30 + 1);
        let previousDate = new Date(previousMonth);
        axios.get(`https://api.exchangerate.host/timeseries?start_date=${previousDate.getFullYear()}-0${previousDate.getMonth() + 1}-${previousDate.getDate()}&end_date=${currentMonth.getFullYear()}-0${currentMonth.getMonth() + 1}-${currentMonth.getDate()}&base=USD`).then(response => {
            setChartData(response.data.rates)


        })
        axios.get(`https://api.exchangerate.host/latest?base=USD&v=${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}-${currentMonth.getDate()}`).then(response => {
            setValuesArray(Object.keys(response.data.rates));
            setCurrentDate(response.data.date);
            setSelectedValue(response.data.rates.RUB);
        })



        // axios.get(`https://api.exchangerate.host/timeseries?start_date=${previousDate.getFullYear()}-0${previousDate.getMonth() + 1}-${previousDate.getDate()}&end_date=${currentMonth.getFullYear()}-0${currentMonth.getMonth() + 1}-${currentMonth.getDate()}&base=USD`).then(response => {
        //     setChartData(response.data.rates)

        // })
    }, [])



    const submitConvert = () => {
        axios.get(`https://api.exchangerate.host/convert?from=${fromValue}&to=${toValue}&amount=${currentAmount}`).then(response => {
            setResultAmount(response.data.result)
        })
    }

    const clearInputs = () => {
        setCurrentAmount(0);
        setResultAmount(0);
    }

    const switchValues = () => {
        setFromValue(toValue);
        setToValue(fromValue);
    }

    const onChangedPeriod = (e) => {
        // console.log(typeof(+e.currentTarget.value))

        let currentMonth = new Date;
        let copyMonth = new Date;
        console.log(periodValue)
        let previousMonth = copyMonth.setDate(copyMonth.getDate() - +e.currentTarget.value + 1);
        let previousDate = new Date(previousMonth);
        let temp = +e.currentTarget.value;
        axios.get(`https://api.exchangerate.host/timeseries?start_date=${previousDate.getFullYear()}-0${previousDate.getMonth() + 1}-${previousDate.getDate()}&end_date=${currentMonth.getFullYear()}-0${currentMonth.getMonth() + 1}-${currentMonth.getDate()}&base=USD`).then(response => {
            setChartData(response.data.rates)
            setPeriodValue(temp);

        })


        // console.log(`set ${periodValue}`);

    }

    return (
        <div className='content'>
            {/* {console.log(`chartData`)}
           {console.log(chartData)} */}
            <div className='content__row'>
                <div className='content__col content__col-main'>
                    <span className='content__currentDate'>{!currentDate ? null : currentDate}</span>
                    <span className='content__title'>USD/RUB</span>
                    <span className='content__currentValue'>{!selectedValue ? null : selectedValue}</span>
                </div>

                <div className='content__chart'>
                    <div className='content__period-select'>
                        <div className='content__period-item'>
                            7 days<input type="radio" name="value" value={7} onChange={onChangedPeriod} />
                        </div>
                        <div className='content__period-item'>
                            14 days<input type="radio" name="value" value={14} onChange={onChangedPeriod} />
                        </div>
                        <div className='content__period-item'>
                            30 days<input type="radio" name="value" value={30} onChange={onChangedPeriod} />
                        </div>
                    </div>
                    <ChartComponent periodValue={periodValue} chartData={chartData} />
                </div>

                <ConvertForm valuesArray={valuesArray}
                    fromValue={fromValue}
                    setFromValue={setFromValue}
                    setCurrentAmount={setCurrentAmount}
                    currentAmount={currentAmount} />
                <ConvertForm valuesArray={valuesArray}
                    toValue={toValue}
                    setToValue={setToValue}
                    disabled={true}
                    resultAmount={resultAmount} />
                <div className='content__functionalBlock'>
                    <button onClick={clearInputs}>
                        Clear
                        <img className='content__icon' src={clear_icon} alt="" />
                    </button>
                    <button onClick={switchValues}>
                        Switch
                        <img className='content__icon' src={switch_icon} alt="" />
                    </button>
                </div>
                <button className='content__submit'
                    type="button"
                    onClick={submitConvert}>Submit</button>

            </div>
        </div>
    )
}

export default Main;