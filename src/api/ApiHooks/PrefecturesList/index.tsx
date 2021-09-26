import { useEffect, useState } from 'react'
import { getRequest } from '../..'
import {
  prefecturesApiType,
  prefecturesSingleDataType,
} from '../../../interfaces/apiEndpointType'

const checkType = (data: prefecturesSingleDataType[]) =>
  Array.isArray(data) &&
  data.length !== 0 &&
  typeof data[0].prefCode === 'number' &&
  typeof data[0].prefName === 'string'

const usePrefecturesList = () => {
  const [resasData, setResasData] = useState<prefecturesSingleDataType[]>([])
  const [resasDataLoding, setResasDataLoding] = useState(false)
  const [resasDataError, setResasDataError] = useState(false)
  useEffect(() => {
    setResasDataLoding(true)
    getRequest<prefecturesApiType>({
      endpointUrl: '/api/v1/prefectures',
      callback: (data) => {
        if (checkType(data.result)) setResasData(data.result)
        else setResasDataError(true)
        setResasDataLoding(false)
      },
    })
  }, [])
  return {
    resasData: resasData,
    resasDataLoding: resasDataLoding,
    resasDataError: resasDataError,
  }
}
export default usePrefecturesList
