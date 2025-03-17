const express = require('express')
const frazTestRoute = require('./fraztest.route')
const faqRoute = require('./faq.route')
const userRoute = require('./user.route.js')
const attendanceRoute = require('./attendance.route')


const config = require('../../config/config')

const router = express.Router()

const defaultRoutes = [
  {
    path: '/fraztest',
    route: frazTestRoute,
  },
  {
    path: '/faq',
    route: faqRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/attendance',
    route: attendanceRoute,
  },
]

const devRoutes = [
  // routes available only in development mode
  /*  {
     path: '/docs',
     route: docsRoute,
   }, */
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route)
  })
}

module.exports = router
