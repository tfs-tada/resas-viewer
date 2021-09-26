import { FC } from 'react'
import Head from 'next/head'
import styles from './index.module.scss'
const Header: FC = () => {
  return (
    <div className={styles.header_wrapper}>
      <Head>
        <title>resas 見られる ぺージ</title>
        <meta name='description' content='resas 見られる ぺージ' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div data-e2e='header-area'>
        <h1>resas 見られる ぺージ</h1>
      </div>
    </div>
  )
}
export default Header
