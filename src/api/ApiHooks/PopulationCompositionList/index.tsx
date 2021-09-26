import { useEffect, useState } from 'react'
import { getRequest } from '../../../api'
import {
  populationCompositionParamType,
  populationCompositionApiType,
} from '../../../interfaces/apiEndpointType'

const usePopulationCompositionList = (prefCodes: number[]) => {
  const [compositionData, setCompositionData] = useState<
    { prefCode: number; data: populationCompositionApiType }[]
  >([])
  const [loading, setLoading] = useState(false)
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
          setCompositionData([
            ...compositionData,
            { prefCode: params.prefCode, data: data },
          ])
          setLoading(false)
        },
      })
    } else
      setCompositionData([
        ...compositionData.filter((e) => prefCodes.includes(e.prefCode)),
      ])
  }, [prefCodes])
  return {
    data: compositionData,
    loading: compositionData.length === 0 && loading,
  }
}
export default usePopulationCompositionList
