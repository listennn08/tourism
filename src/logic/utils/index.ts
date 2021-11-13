import type { TourismPicture } from '@/types'

const getLocation = (d: any) => {
  if (d.Address) {
    const matched = d.Address.match(/(?:市[\d]{3}|市)((?:.*)+區)/)

    if (matched) {
      return `${d.City}·${matched[1]}`
    }
  }

  return d.City
}

const showPicture = (p: TourismPicture) => {
  let random = Math.floor(Math.random() * 3) + 1
  while (!p[`PictureUrl${random}`]) {
    random = Math.floor(Math.random() * 3) + 1
  }

  return p[`PictureUrl${random}`]
}

export const shuffle = <T>(array: Array<T>): Array<T> => {
  const shallowArr = JSON.parse(JSON.stringify(array)) as typeof array
  for (let i = shallowArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shallowArr[i], shallowArr[j]] = [shallowArr[j], shallowArr[i]]
  }
  return shallowArr
}

export function useUtils() {
  return {
    getLocation,
    showPicture,
    shuffle,
  }
}
