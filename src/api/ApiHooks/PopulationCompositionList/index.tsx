import { useEffect, useState } from 'react'
import { getRequest } from '../../../api'
import {
  populationCompositionParamType,
  populationCompositionApiType,
} from '../../../interfaces/apiEndpointType'

const checkType = (data: populationCompositionApiType) =>
  typeof data.result.boundaryYear === 'number' &&
  Array.isArray(data.result.data) &&
  typeof data.result.data[0].label === 'string' &&
  Array.isArray(data.result.data[0].data) &&
  typeof data.result.data[0].data[0].value === 'number' &&
  typeof data.result.data[0].data[0].year === 'number'

const usePopulationCompositionList = (prefCodes: number[]) => {
  const [compositionData, setCompositionData] = useState<
    { prefCode: number; data: populationCompositionApiType }[]
  >([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    if (prefCodes.length > 0 && compositionData.length < prefCodes.length) {
      setLoading(true)
      const params: populationCompositionParamType = {
        prefCode: prefCodes[prefCodes.length - 1],
      }
      getRequest<populationCompositionApiType>({
        endpointUrl: '/api/v1/population/composition/perYear',
        params: params,
        callback: (data) => {
          if (checkType(data)) {
            setCompositionData([
              ...compositionData,
              { prefCode: params.prefCode, data: data },
            ])
          } else setError(true)
          setLoading(false)
        },
      })
    } else
      setCompositionData([
        ...compositionData.filter((e) => prefCodes.includes(e.prefCode)),
      ])
  }, [prefCodes])
  return {
    compositionData: compositionData,
    loading: compositionData.length === 0 && loading,
    error: error,
  }
}
export default usePopulationCompositionList
