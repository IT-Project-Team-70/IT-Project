import {
  FRONTPAGE,
  EVERYONES_KITCHEN,
  PERSONAL_KITCHEN,
  TEST_1,
  TEST_2,
  TEST_3,
  UPLOAD_RECIPE,
  RECIPE,
  // RESET_PASSWORD,
} from './routeConstant'

import {
  FrontPage,
  EveryonesKitchen,
  PersonalKitchen,
} from '../containers/feature'

import { Test1, Test2, Test3 } from '../containers/developing'
import UploadRecipe from '../containers/feature/personalKitchen/uploadRecipe'

const RouteItems = [
  {
    name: `Don't Forget Your Recipe`,
    path: FRONTPAGE,
    component: FrontPage,
    exact: true,
    show: true,
  },
  {
    name: `Everyone's Kitchen`,
    path: EVERYONES_KITCHEN,
    component: EveryonesKitchen,
    exact: true,
    show: true,
  },
  {
    name: 'Personal Kitchen',
    path: PERSONAL_KITCHEN,
    component: PersonalKitchen,
    exact: true,
    show: true,
  },
  {
    name: 'Upload Recipe',
    path: UPLOAD_RECIPE,
    component: UploadRecipe,
    exact: true,
    show: false,
  },
  {
    name: 'Recipe',
    path: RECIPE,
    component: Test1,
    exact: true,
    show: false,
  },
  // {
  //   name: 'ResetPassword',
  //   path: RESET_PASSWORD,
  //   component: null,
  //   exact: true,
  //   show: true,
  // },
  {
    name: 'Test 1',
    path: TEST_1,
    component: Test1,
    show:
      process.env.NODE_ENV === 'development' &&
      process.env.REACT_APP_TEST_MODE === 'ON',
  },
  {
    name: 'Test 2',
    path: TEST_2,
    component: Test2,
    show:
      process.env.NODE_ENV === 'development' &&
      process.env.REACT_APP_TEST_MODE === 'ON',
  },
  {
    name: 'Test 3',
    path: TEST_3,
    component: Test3,
    show:
      process.env.NODE_ENV === 'development' &&
      process.env.REACT_APP_TEST_MODE === 'ON',
  },
]

export { RouteItems }
