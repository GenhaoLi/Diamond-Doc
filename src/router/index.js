import Vue from "vue"
import VueRouter from "vue-router"
import HomeView from "../views/HomeView.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/workspace",
    name: "workspace",
    component: () => import("../views/WorkspaceView.vue"),
    redirect: "/workspace/files",
    children: [
      {
        path: "files",
        name: "files",
        component: () => import("../views/Workspace/FilesView.vue"),
      },
      {
        path: "teams",
        name: "teams",
        component: () => import("../views/Workspace/TeamsView.vue"),
      },
      {
        path: "favorites",
        name: "favorites",
        component: () => import("../views/Workspace/FavoritesView.vue"),
      },
      {
        path: "trash",
        name: "trash",
        component: () => import("../views/Workspace/TrashView.vue"),
      },
    ],
  },
  // edit route for files
  {
    path: "/edit/:fileId",
    name: "edit",
    component: () => import("../views/EditView.vue"),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
