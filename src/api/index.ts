import { cityCore, GET } from './core'

export const getCity = () => cityCore.get('/City?$format=JSON')

interface APIParam {
  [key: string]: string | number | undefined
  city?: string
  top?: number
  filter?: string
  page?: number
  skip?: number
  select?: string
}

const defaultParam = {
  top: 30,
}

const defaultFilter = 'Picture/PictureUrl1 ne null and Address ne null and City ne null'
function formatRequestUrl(url: string, param: APIParam = {}, type = 'other') {

  const { city, ...keys } = type === 'other' ? Object.assign({}, defaultParam, param) : param

  if (type === 'other') {
    if (city) url += `/${city}`

    if (keys.filter) {
      keys.filter += ` and ${defaultFilter}`
    } else {
      keys.filter = defaultFilter
    }

    if (keys.page) {
      keys.skip = (keys.page - 1) * 30
      delete keys.page
    }
  }

  return url + '?$format=JSON' + Object.keys(keys)
    .reduce((resp, key) => `${resp}&$${key}=${keys[key]}`, '')
}

// 取得所有觀光
export const getTourism = (params?: APIParam) => GET(formatRequestUrl('/ScenicSpot', params))

// 取得活動
export const getActivity = (params?: APIParam) => GET(formatRequestUrl('/Activity', params))

// 取得餐飲資訊
export const getRestaurant = (params?: APIParam) => GET(formatRequestUrl('/Restaurant', params))

export const getRestaurantByCity = (params?: APIParam) => GET(formatRequestUrl('/Restaurant', params))

// 取得旅館資訊
export const getHotel = (params?: APIParam) => GET(formatRequestUrl('/Hotel', params))

export const getRoutes = (param: APIParam) => GET(formatRequestUrl('/Bus/Route/TaiwanTrip', param, 'bus'))
export const getRouteStops = (tripName: string, param: APIParam) =>
  GET(formatRequestUrl(`/Bus/StopOfRoute/TaiwanTrip/${tripName}`, param, 'bus'))

export const getEstimateRoute = (tripName: string, param: APIParam) =>
  GET(formatRequestUrl(`/Bus/EstimatedTimeOfArrival/TaiwanTrip/${tripName}`, param, 'bus'))