// /api/v1/prefectures
export interface prefecturesSingleDataType {
  prefCode: number
  prefName: string
}
export interface prefecturesApiType {
  message: null
  result: prefecturesSingleDataType[]
}

// /api/v1/population/composition/perYear?cityCode=11362&prefCode=11
type populationCompositionApiLabel = '総人口' | '年少人口' | '老年人口'
export interface populationCompositionParamType {
  prefCode: number
}

export interface populationCompositionApiType {
  message: null
  result: {
    boundaryYear: number
    data: {
      label: populationCompositionApiLabel
      data: {
        year: number
        value: number
      }[]
    }[]
  }
}
