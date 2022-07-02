import { useState } from 'react';
import './ConvertForm.scss';
import arrow_icon from './../../assets/images/arrow.png';

const ConvertForm = ({
    valuesArray,
    fromValue,
    toValue,
    setFromValue,
    setToValue,
    disabled,
    setCurrentAmount,
    resultAmount,
    currentAmount
}) => {

    const [isSelected, changeSelectMode] = useState(false);

    if (!valuesArray) {
        return <div>loading...</div>
    }

    const setCurrentValue = (e) => {
        if (!fromValue) {
            setToValue(e.currentTarget.value);
        } else {
            setFromValue(e.currentTarget.value);
        }

    }

    const onChangeAmount = (e) => {
        setCurrentAmount(e.currentTarget.value)
    }

    return (
        <div className='convertForm'>
            <input type="number"
                className="convertForm__input"
                disabled={disabled}
                onChange={onChangeAmount}
                value={!fromValue ? resultAmount : currentAmount}
                // value={!resultAmount || resultAmount == 0 ? null : resultAmount}
                placeholder={!disabled ? 'Enter amount' : null}/>
            
                <button className='convertForm__btn-select' onClick={() => !isSelected
                    ? changeSelectMode(true)
                    : changeSelectMode(false)}>{!fromValue ? toValue : fromValue}
                    <img className='convertForm__btn-icon' src={arrow_icon} alt="" />
                </button>


            <ul className={!isSelected
                ? 'convertForm__selectList-hide'
                : 'convertForm__selectList'}>
                {valuesArray.map(value => {
                    return <li><input onClick={setCurrentValue} type="button" value={value} /></li>
                })}
            </ul>
        </div>
    )
}

export default ConvertForm;