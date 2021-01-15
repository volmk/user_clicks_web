import React, {useState} from 'react'
import {stringToDate} from "../../utils/dateString"
import '../styles/DateInput.scss'

const useInput = (initialValue, onChangeCallback) => {
    const [value, setValue] = useState(initialValue)
    return {
        value,
        bind: {
            value,
            onChange: event => {
                setValue(event.target.value)
                onChangeCallback()
            }
        }
    }
}

function DateInput({makeRequest, minInit, maxInit}) {
    const [error, setError] = useState('')
    const onChangeCallback = () => {
        if (error !== '') setError('')
    }
    
    const {value: fromVal, bind: bindFrom} = useInput(minInit, onChangeCallback)
    const {value: toVal, bind: bindTo} = useInput(maxInit, onChangeCallback)

    const handleSubmit = event => {
        event.preventDefault()
        setError('')
        const fromDate = stringToDate(fromVal)
        const toDate = stringToDate(toVal)
        if (!toDate || !fromDate || fromDate > toDate) {
            setError('Invalid date')
        } else {
            makeRequest(fromVal, toVal)
        }
    }

    return (
        <div className='date_input'>
            <form onSubmit={handleSubmit} className='date_input__form'>
                <div className="date_input__text">
                    <input type="text" {...bindFrom} placeholder='From'/>
                    <span>-</span>
                    <input type="text" {...bindTo} placeholder='To'/>
                </div>
                <input className='date_input__button' type="submit" value="Get chart"/>
            </form>
            <p className='date_input__info'>Enter date. Format: <strong>2020-10-15</strong></p>
            <p className='date_input__error'>{error}</p>
        </div>
    )
}

export default DateInput