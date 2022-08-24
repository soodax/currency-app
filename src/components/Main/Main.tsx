import './Main.scss';
import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import ConvertForm from '../ConvertForm/ConvertForm';
import ChartComponent from '../ChartComponent/ChartComponent';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import DeleteIcon from '@mui/icons-material/Delete';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import {
    TChartDataItem,
    TCurrentCurrencyResponse,
    TConvertCurrencyResponse,
    TPeriodCurrencyResponse,
    TCurrentCurrency
} from '../../types/data';

const Main: React.FC = () => {

    const [valuesArray, setValuesArray] = useState<string[]>();
    const [fromValue, setFromValue] = useState<string>('USD');
    const [toValue, setToValue] = useState<string>('RUB');
    const [currentAmount, setCurrentAmount] = useState<number | undefined>();
    const [resultAmount, setResultAmount] = useState<number | undefined>();
    const [currentDate, setCurrentDate] = useState();
    const [selectedValue, setSelectedValue] = useState<number | undefined>();
    const [chartData, setChartData] = useState<TChartDataItem[] | undefined>();
    const [periodValue, setPeriodValue] = useState<number>(30);
    const [advancedOption, setAdvancedOption] = useState<boolean>(false);
    const [advancedPeriodValue, setAdvancedPeriodValue] = useState<number>(30);
    const mainURL: string = 'https://api.exchangerate.host/';

    useEffect(() => {
        getPeriodData({});
        setCurrencyValue({ baseValue: 'USD', secondaryValue: 'RUB' });
    }, [])

    const setCurrencyValue = async ({ baseValue = fromValue, secondaryValue = toValue }: TCurrentCurrency) => {

        let currentMonth = new Date();

        axios.get<TCurrentCurrencyResponse>(`${mainURL}latest?base=${baseValue}&v=${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}-${currentMonth.getDate()}`).then(response => {
            setValuesArray(Object.keys(response.data.rates));
            setCurrentDate(response.data.date);
            setSelectedValue(response.data.rates[secondaryValue]);
        })
    }

    const getPeriodData = async ({ secondaryValue = '30', baseValue = 'USD' }: TCurrentCurrency) => {
        let currentMonth = new Date();
        let copyMonth = new Date();
        let previousMonth = copyMonth.setDate(copyMonth.getDate() - +secondaryValue + 1);
        let previousDate = new Date(previousMonth);

        let response = await axios.get<TPeriodCurrencyResponse>(`${mainURL}timeseries?start_date=${previousDate.getFullYear()}-0${previousDate.getMonth() + 1}-${previousDate.getDate()}&end_date=${currentMonth.getFullYear()}-0${currentMonth.getMonth() + 1}-${currentMonth.getDate()}&base=${baseValue}`);
        setPeriodValue(+secondaryValue);
        setChartData(response.data.rates)

    }

    const submitConvert = async () => {
        let response = await axios.get<TConvertCurrencyResponse>(`${mainURL}convert?from=${fromValue}&to=${toValue}&amount=${currentAmount}`);
        setResultAmount(response.data.result);
    }

    const clearInputs = (): void => {
        setCurrentAmount(0);
        setResultAmount(0);
    }

    const switchValues = (): void => {
        setFromValue(toValue);
        setToValue(fromValue);
        setCurrentAmount(resultAmount);
        setResultAmount(currentAmount);
    }

    const onPeriodChange = (event: Event, newValue: number | number[]) => {
        if (!Array.isArray(newValue)) {
            setAdvancedPeriodValue(newValue);
        }
    };

    const advancedOptionSubmit = (): void => {
        getPeriodData({ secondaryValue: advancedPeriodValue.toString() })
    }

    const toggleAdvancedOption = (): void => {
        !advancedOption ? setAdvancedOption(true) : setAdvancedOption(false)
    }

    if (!valuesArray) {
        return <div>loading...</div>
    }

    return (
        <div className='content'>
            <div className='content__row'>
                <div className='content__info'>
                    <div>{!currentDate ? null : currentDate}</div>
                    <Tooltip title="You can change currency in converter." arrow>
                        <div className='content__currency'>
                            {!fromValue ? null : fromValue}/{!toValue ? null : toValue}
                        </div>
                    </Tooltip>
                    <div>{!selectedValue ? null : selectedValue}</div>
                </div>
                <div className='content__chart'>
                    <div className='content__chart-options'>
                        {!advancedOption
                            ? <div className='content__chart-row'>
                                <FormControl>
                                    <RadioGroup row onChange={event => getPeriodData({ secondaryValue: event.currentTarget.value })}>
                                        <FormControlLabel value={7} control={<Radio />} label="7 days" />
                                        <FormControlLabel value={14} control={<Radio />} label="14 days" />
                                        <FormControlLabel value={30} control={<Radio />} label="30 days" />
                                    </RadioGroup>
                                </FormControl>
                                <Button className='content__btn'
                                    onClick={toggleAdvancedOption}
                                    variant="contained"
                                    size="small"
                                // endIcon={<AutorenewIcon className='content__btn-icon' />}
                                >
                                    Advanced options
                                </Button>
                            </div>
                            : <div className='content__chart-row'>
                                <Slider aria-label="Period"
                                    defaultValue={30}
                                    onChange={onPeriodChange}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    min={2}
                                    max={120} />
                                <Button className='content__btn'
                                    size="small"
                                    onClick={advancedOptionSubmit}
                                    variant="contained"
                                // endIcon={<KeyboardArrowRightIcon className='content__btn-icon' />}
                                >
                                    Submit
                                </Button>
                                <Button className='content__btn'
                                    onClick={toggleAdvancedOption}
                                    variant="contained"
                                    size="small"
                                // endIcon={<CloseIcon className='content__btn-icon' />}
                                >
                                    Close

                                </Button></div>}
                    </div>
                    <ChartComponent periodValue={periodValue}
                        chartData={chartData}
                        toValue={toValue} />
                </div>
                <h2>Converter</h2>
                <ConvertForm valuesArray={valuesArray}
                    fromValue={fromValue}
                    setFromValue={setFromValue}
                    setCurrentAmount={setCurrentAmount}
                    currentAmount={currentAmount}
                    setCurrencyValue={setCurrencyValue}
                    getPeriodData={getPeriodData} />
                <ConvertForm valuesArray={valuesArray}
                    toValue={toValue}
                    setToValue={setToValue}
                    disabled={true}
                    resultAmount={resultAmount}
                    setCurrencyValue={setCurrencyValue}
                    getPeriodData={getPeriodData} />
                <div className='content__functionalBlock'>
                    <Button className='content__btn'
                        variant="contained"
                        onClick={clearInputs}
                        endIcon={<DeleteIcon className='content__btn-icon' />}
                    >
                        Clear
                    </Button>
                    <Button className='content__btn'
                        variant="contained"
                        onClick={switchValues}
                        endIcon={<AutorenewIcon className='content__btn-icon' />}
                    >
                        Switch
                    </Button>
                </div>
                <Button className='content__btn'
                    variant="contained"
                    onClick={submitConvert}
                    endIcon={<KeyboardArrowRightIcon className='content__btn-icon' />}
                >
                    Submit
                </Button>
            </div>
        </div>
    )
}

export default Main;