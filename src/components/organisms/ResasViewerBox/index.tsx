import { FC, useEffect, useState } from 'react'
import { getRequest } from '../../../api'
import styles from './index.module.scss'
const ResasViewerBox: FC = () => {
  const [resasData, setResasData] = useState()
  useEffect(() => {
    getRequest<any>({
      endpointUrl: '/api/v1/result/data/data/value',
      callback: (data) => setResasData(data),
    })
  }, [])
  console.log(resasData)
  return <>resas box</>
}
export default ResasViewerBox
