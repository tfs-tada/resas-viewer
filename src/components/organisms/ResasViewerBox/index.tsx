import { FC, useEffect, useState } from 'react'
import { getRequest } from '../../../api'
import styles from './index.module.scss'
import {
  prefecturesApiType,
  prefecturesSingleDataType,
} from '../../../interfaces/apiEndpointType'
import CheckArea from '../../molecules/CheckArea'
import usePopulationCompositionList from '../../../api/ApiHooks/PopulationCompositionList'

const ResasViewerBox: FC = () => {
  const [resasData, setResasData] = useState<prefecturesSingleDataType[]>([])
  const [prefCodeList, setPrefCodeList] = useState<number[]>([])
  const { data, loading } = usePopulationCompositionList(prefCodeList)
  console.log(data)
  useEffect(() => {
    getRequest<prefecturesApiType>({
      endpointUrl: '/api/v1/prefectures',
      callback: (data) => setResasData(data.result),
    })
  }, [])
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
      <div>ここにグラフ</div>
    </div>
  )
}
export default ResasViewerBox
