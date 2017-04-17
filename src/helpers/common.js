import _ from 'lodash'
import routes from '../routes'

export function navigateTo(navigator, page) {
  // check if component is mounted
  const match = _.find(navigator.getCurrentRoutes(), (item) => {
    console.log(routes);
    return routes[page].index === item.index
  })

  if (match) {
    navigator.jumpTo(routes[page])
  } else {
    navigator.push(routes[page])
  }
}
