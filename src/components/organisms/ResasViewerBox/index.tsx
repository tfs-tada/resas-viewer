import { FC, useEffect, useState } from 'react'
import { getRequest } from '../../../api'
import styles from './index.module.scss'
import {
  prefecturesApiType,
  prefecturesSingleDataType,
} from '../../../interfaces/apiEndpointType'
import CheckArea from '../../molecules/CheckArea'
import usePopulationCompositionList from '../../../api/ApiHooks/PopulationCompositionList'
import LineChartBox from '../../molecules/LineChartBox'
import { populationCompositionApiType } from '../../../interfaces/apiEndpointType'
import { lineChartSingleType } from '../../../interfaces/graphPropsType'

// LineChartで読めるように整形
const reshapeDataFor = (
  data: { prefCode: number; data: populationCompositionApiType }[],
  resasData: prefecturesSingleDataType[]
) => {
  let tempObject: { [key: number]: lineChartSingleType } = {}
  data.forEach((singlePrefData) => {
    const totalPopulationList = singlePrefData.data.result.data.filter(
      (f) => f.label === '総人口'
    )
    totalPopulationList.map((yearsData) => {
      yearsData.data.forEach((singleYearData) => {
        if (!tempObject[singleYearData.year])
          tempObject[singleYearData.year] = {
            x: singleYearData.year,
          }
        const prefName = resasData.find(
          (e) => e.prefCode === singlePrefData.prefCode
        )?.prefName
        if (typeof prefName === 'string')
          tempObject[singleYearData.year][prefName] = singleYearData.value
      })
    })
  })
  return Object.values(tempObject)
}

const ResasViewerBox: FC = () => {
  const [resasData, setResasData] = useState<prefecturesSingleDataType[]>([])
  const [prefCodeList, setPrefCodeList] = useState<number[]>([])
  const [lineChartFormatData, setLineChartFormatData] = useState<
    lineChartSingleType[]
  >([])
  const { data, loading } = usePopulationCompositionList(prefCodeList)
  useEffect(() => {
    getRequest<prefecturesApiType>({
      endpointUrl: '/api/v1/prefectures',
      callback: (data) => setResasData(data.result),
    })
  }, [])
  useEffect(() => {
    setLineChartFormatData(reshapeDataFor(data, resasData))
  }, [data, resasData])

  // チェックリストが押された時のデータ更新
  const fixPrefCodeList = (prefCode: number) => {
    const newList = prefCodeList.includes(prefCode)
      ? [...prefCodeList.filter((num) => num !== prefCode)]
      : [...prefCodeList, prefCode]
    setPrefCodeList(newList)
  }

  return (
    <div className={styles.contents_wrapper}>
      <div className={styles.checkarea_wrapper}>
        {resasData.map((e) => (
          <div key={e.prefCode}>
            <CheckArea
              isChecked={prefCodeList.includes(e.prefCode)}
              labelText={e.prefName}
              onChange={() => fixPrefCodeList(e.prefCode)}
            />
          </div>
        ))}
      </div>
      {prefCodeList.length === 0 || loading ? (
        <div className={styles.checkcomment_wrapper}>
          表示したい都道府県を選択してください
        </div>
      ) : (
        <div className={styles.graphbox_wrapper}>
          <LineChartBox data={lineChartFormatData} />
        </div>
      )}
    </div>
  )
}
export default ResasViewerBox
