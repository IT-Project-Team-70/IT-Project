import {
  FRONTPAGE,
  EVERYONES_KITCHEN,
  PERSONAL_KITCHEN,
  TEST_1,
  TEST_2,
  TEST_3,
  UPLOAD_RECIPE,
  RESET_PASSWORD,
  RESET_PASSWORD_FAILURE,
} from './routeConstant'

import {
  FrontPage,
  EveryonesKitchen,
  PersonalKitchen,
} from '../containers/feature'

import { Test1, Test2, Test3 } from '../containers/developing'
import UploadRecipe from '../containers/feature/personalKitchen/uploadRecipe'
import ResetPassword from '../containers/resetPassword'
import { modalUnstyledClasses } from '@mui/material'

export const RouteItems = [
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
    name: 'Upload Recipe',
    path: UPLOAD_RECIPE,
    component: UploadRecipe,
    exact: true,
    authority: false,
  },
  {
    name: 'Test 1',
    path: TEST_1,
    component: Test1,
    authority:
      process.env.NODE_ENV === 'development' &&
      process.env.REACT_APP_TEST_MODE === 'ON',
  },
  {
    name: 'Test 2',
    path: TEST_2,
    component: Test2,
    authority:
      process.env.NODE_ENV === 'development' &&
      process.env.REACT_APP_TEST_MODE === 'ON',
  },
  {
    name: 'Test 3',
    path: TEST_3,
    component: Test3,
    authority:
      process.env.NODE_ENV === 'development' &&
      process.env.REACT_APP_TEST_MODE === 'ON',
  },
]

export const notNavRouteItems = [
  {
    name: 'ResetPassword',
    path: RESET_PASSWORD,
    component: ResetPassword,
    exact: true,
    authority: true,
  },
  {
    name: 'ResetPassword',
    path: RESET_PASSWORD_FAILURE,
    component: ResetPassword,
    exact: true,
    authority: true
  }
]

