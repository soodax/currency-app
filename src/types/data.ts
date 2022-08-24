export type TChartDataItem = {
    [key: string]: number
}

export type TChartComponentProps = {
    chartData: TChartDataItem[] | undefined
    periodValue: number
    toValue: string
}

export type TConvertFormProps = {
    valuesArray: string[]
    fromValue?: string
    toValue?: string
    setFromValue?: any
    setToValue?: any
    disabled?: boolean
    setCurrentAmount?: any
    resultAmount?: number | undefined
    currentAmount?: number | undefined
    setCurrencyValue: any
    getPeriodData?: any
}

export type TCurrentCurrencyResponse = {
    motd: {
        msg: string
        url: string
    }
    success: boolean
    base: string
    date: any
    rates: TChartDataItem
}

export type TConvertCurrencyResponse = {
    motd: {
        msg: string
        url: string
    }
    success: boolean
    query: {
        from: string
        to: string
        amount: number
    }
    info: {
        rate: number
    }
    historical: boolean
    date: any
    result: number
}

export type TPeriodCurrencyResponse = {
    motd: {
        msg: string
        url: string
      }
      success: boolean
      timeseries: boolean
      base: string
      start_date: any
      end_date: any
      rates: any
}

export type TCurrentCurrency = {
    baseValue?: string
    secondaryValue?: string
}