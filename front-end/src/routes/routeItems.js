import {
  FRONTPAGE,
  EVERYONES_KITCHEN,
  PERSONAL_KITCHEN,
  TEST_1,
  TEST_2,
  TEST_3,
} from './routeConstant'

import {
  FrontPage,
  EveryonesKitchen,
  PersonalKitchen,
} from '../containers/feature'

import { Test1, Test2, Test3 } from '../containers/developing'

const RouteItems = [
  {
    name: `Don't Forget Your Recipe`,
    path: FRONTPAGE,
    component: FrontPage,
    exact: true,
    authority: true,
  },
  {
    name: `Everyone's Kitchen`,
    path: EVERYONES_KITCHEN,
    component: EveryonesKitchen,
    exact: true,
    authority: true,
  },
  {
    name: 'Personal Kitchen',
    path: PERSONAL_KITCHEN,
    component: PersonalKitchen,
    exact: true,
    authority: true,
  },
  {
    name: 'Test 1',
    path: TEST_1,
    component: Test1,
    authority: process.env.NODE_ENV === 'development',
  },
  {
    name: 'Test 2',
    path: TEST_2,
    component: Test2,
    authority: process.env.NODE_ENV === 'development',
  },
  {
    name: 'Test 3',
    path: TEST_3,
    component: Test3,
    authority: process.env.NODE_ENV === 'development',
  },
]

export { RouteItems }
