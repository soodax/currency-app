import './ConvertForm.scss';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import React from 'react';
import { TConvertFormProps } from '../../types/data'

const ConvertForm: React.FC<TConvertFormProps> = ({
    valuesArray,
    fromValue,
    toValue,
    setFromValue,
    setToValue,
    disabled,
    setCurrentAmount,
    resultAmount,
    currentAmount,
    setCurrencyValue,
    getPeriodData
}) => {

    if (!valuesArray) {
        return <div>loading...</div>
    }

    const onChangeAmount = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setCurrentAmount(event.currentTarget.value)
    }

    const setCurrentValue = (event: SelectChangeEvent<string>): void => {
        if (!fromValue) {
            setToValue(event.target.value);
            setCurrencyValue({secondaryValue: event.target.value})
        } else {
            setFromValue(event.target.value);
            setCurrencyValue({baseValue: event.target.value})
            getPeriodData({baseValue: event.target.value});
        }
    };

    return (
        <div className='convertForm'>
            <TextField id="filled-basic"
                type="number"
                // label={!disabled ? 'Enter amount' : 'Result'}
                variant="outlined"
                className="convertForm__input"
                disabled={disabled}
                onChange={onChangeAmount}
                value={!fromValue ? resultAmount : currentAmount}
            placeholder={!disabled ? 'Enter amount' : 'Result'}/>
            <div>
                <FormControl fullWidth variant="outlined">
                    <InputLabel id="valueLabel">
                        {!fromValue ? 'To' : 'From'}
                    </InputLabel>
                    <Select labelId="valueLabel"
                        value={!fromValue ? toValue : fromValue}
                        label={!fromValue ? toValue : fromValue}
                        onChange={setCurrentValue} >
                        {valuesArray.map((value, index) => {
                            return <MenuItem value={value} key={index}>{value}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}

export default ConvertForm;