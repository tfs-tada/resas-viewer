import { FC, useEffect, useState } from 'react'
import styles from './index.module.scss'
import { prefecturesSingleDataType } from '../../../interfaces/apiEndpointType'
import CheckArea from '../../molecules/CheckArea'
import usePopulationCompositionList from '../../../api/ApiHooks/PopulationCompositionList'
import LineChartBox from '../../molecules/LineChartBox'
import { populationCompositionApiType } from '../../../interfaces/apiEndpointType'
import { lineChartSingleType } from '../../../interfaces/graphPropsType'
import usePrefecturesList from '../../../api/ApiHooks/PrefecturesList'

// 2020年までのデータを表示
const Annuallimit = 2020

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
        if (singleYearData.year > Annuallimit) return
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
  const [prefCodeList, setPrefCodeList] = useState<number[]>([])
  const [lineChartFormatData, setLineChartFormatData] = useState<
    lineChartSingleType[]
  >([])
  const { resasData, resasDataError } = usePrefecturesList()
  const { compositionData, loading } =
    usePopulationCompositionList(prefCodeList)
  useEffect(() => {
    setLineChartFormatData(reshapeDataFor(compositionData, resasData))
  }, [compositionData, resasData])

  // チェックリストが押された時のデータ更新
  const fixPrefCodeList = (prefCode: number) => {
    const newList = prefCodeList.includes(prefCode)
      ? [...prefCodeList.filter((num) => num !== prefCode)]
      : [...prefCodeList, prefCode]
    setPrefCodeList(newList)
  }

  // 県一覧取得に失敗したときのエラー表示
  if (resasDataError) {
    return (
      <div className={styles.contents_wrapper}>
        <div className={styles.checkcomment_wrapper} data-e2e='firsterror-area'>
          データの取得に失敗しました
        </div>
      </div>
    )
  } else {
    return (
      <div className={styles.contents_wrapper}>
        <div className={styles.checkarea_wrapper} data-e2e='checkbox-area'>
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
          <div className={styles.checkcomment_wrapper} data-e2e='nodata-area'>
            表示したい都道府県を選択してください
          </div>
        ) : (
          <div className={styles.graphbox_wrapper} data-e2e='graph-area'>
            <LineChartBox
              data={lineChartFormatData}
              xLabel={'年度'}
              yLabel={'人口数'}
            />
          </div>
        )}
      </div>
    )
  }
}
export default ResasViewerBox
