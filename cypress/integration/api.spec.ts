/// <reference types="cypress" />
import axios from 'axios'
import {
  populationCompositionSingleType,
  prefecturesSingleDataType,
} from '../../src/interfaces/apiEndpointType'

const headers = { 'X-API-KEY': Cypress.env('NEXT_PUBLIC_RESAS_API_KEY') }
context('api test', () => {
  let resasData: prefecturesSingleDataType[] = []
  let compositionData: populationCompositionSingleType | null = null
  before(async () => {
    {
      const { data } = await axios.get(
        `${Cypress.env('ENDPOINT_URL')}/api/v1/prefectures`,
        { headers }
      )
      resasData = data.result
    }
    {
      const { data } = await axios.get(
        `${Cypress.env('ENDPOINT_URL')}/api/v1/population/composition/perYear`,
        { headers, params: { prefCode: resasData[0].prefCode } }
      )
      compositionData = data.result
    }
  })
  describe('型チェック', () => {
    it('check - resasData : api/v1/prefectures', () => {
      expect(Array.isArray(resasData)).eq(true)
      expect(resasData.length !== 0).eq(true)
      expect(typeof resasData[0].prefCode === 'number').eq(true)
      expect(typeof resasData[0].prefName === 'string').eq(true)
    })
    it('check - compositionData : api/v1/prefectures', () => {
      expect(typeof compositionData === 'object').eq(true)
      if (compositionData) {
        expect(typeof compositionData.boundaryYear === 'number').eq(true)
        expect(Array.isArray(compositionData.data)).eq(true)
        expect(typeof compositionData.data[0].label === 'string').eq(true)
        expect(Array.isArray(compositionData.data[0].data)).eq(true)
        expect(typeof compositionData.data[0].data[0].value === 'number').eq(
          true
        )
        expect(typeof compositionData.data[0].data[0].year === 'number').eq(
          true
        )
      }
    })
  })
})
