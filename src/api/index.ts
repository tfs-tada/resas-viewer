import axios from 'axios'
import { API_ACCESSKEY, API_ENDPOINT } from '../constant/Env'
interface getRequestType<T> {
  endpointUrl: string
  params?: any
  callback?: (data: T) => void
}
export const getRequest = async <T>(arg: getRequestType<T>) => {
  const headers = {
    'X-API-KEY': API_ACCESSKEY,
  }
  await axios
    .get(`${API_ENDPOINT}${arg.endpointUrl}`, {
      headers,
      params: arg.params || {},
    })
    .then((res) => {
      console.log(res.data)
      const data = res.data
      arg.callback && arg.callback(data)
    })
    .catch((err) => {
      console.log(err)
    })
}
