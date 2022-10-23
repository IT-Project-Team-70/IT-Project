import {
  FRONTPAGE,
  EVERYONES_KITCHEN,
  PERSONAL_KITCHEN,
  TEST_1,
  TEST_2,
  TEST_3,
  UPLOAD_RECIPE,
  RECIPE,
  RESET_PASSWORD,
  RESET_PASSWORD_FAILURE,
  LOGIN,
  EDIT_RECIPE,
  HOW_TO_UPLOAD,
  NOTIFICATION,
  ONE_USER_KITCHEN,
} from './routeConstant'

import {
  FrontPage,
  EveryonesKitchen,
  PersonalKitchen,
  OneUserKitchen,
} from '../containers/feature'

import { Test1, Test2, Test3 } from '../containers/developing'
import UploadRecipe from '../containers/feature/personalKitchen/uploadRecipe'
import ResetPassword from '../containers/resetPassword'
import ViewRecipe from '../containers/viewRecipe'
import LoginPanel from '../containers/login/login'
import EditRecipe from '../containers/feature/personalKitchen/editRecipe'
import HowToUpload from '../containers/feature/frontPage/howToUpload'
import NotiPopUp from '../containers/notification/notification'

export const RouteItems = [
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
    component: ViewRecipe,
    exact: true,
    show: false,
  },
  {
    name: 'Edit Recipe',
    path: EDIT_RECIPE,
    component: EditRecipe,
    exact: true,
    show: false,
  },
  {
    name: 'ResetPassword',
    path: RESET_PASSWORD,
    component: ResetPassword,
    exact: true,
    show: false,
  },
  {
    name: 'ResetPassword',
    path: RESET_PASSWORD_FAILURE,
    component: ResetPassword,
    exact: true,
    show: false,
  },
  {
    name: 'Login',
    path: LOGIN,
    component: LoginPanel,
    exact: true,
    show: false,
  },
  {
    name: 'How to upload',
    path: HOW_TO_UPLOAD,
    component: HowToUpload,
    exact: true,
    show: false,
  },
  {
    name: 'Notification',
    path: NOTIFICATION,
    component: NotiPopUp,
    exact: true,
    show: false,
  },
  {
    name: 'OneUserKitchen',
    path: ONE_USER_KITCHEN,
    component: OneUserKitchen,
    exact: true,
    show: false,
  },
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
    authority: true,
  },
]
