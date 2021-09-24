import { FC } from 'react'
import Header from '../../organisms/Header'
import ResasViewerBox from '../../organisms/ResasViewerBox'
import styles from './index.module.scss'
const TopPageTemplate: FC = () => {
  return (
    <div className=''>
      <div>
        <Header />
      </div>
      <div className=''>
        <ResasViewerBox />
      </div>
    </div>
  )
}
export default TopPageTemplate
