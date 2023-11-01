import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout';

// 提取常用路由属性
const routeDefaults = {
	component: Layout,
	hidden: true,
};

export const constantRoutes = [
	{
		path: '/redirect',
		...routeDefaults,
		children: [
			{
				path: '/redirect/:path(.*)',
				component: () => import('@/views/redirect/index.vue'),
			},
		],
	},
	{
		path: '/login',
		...routeDefaults,
		component: () => import('@/views/login'),
	},
	{
		path: '/register',
		...routeDefaults,
		component: () => import('@/views/register'),
	},
	{
		path: '/:pathMatch(.*)*',
		...routeDefaults,
		component: () => import('@/views/error/404'),
	},
	{
		path: '/401',
		...routeDefaults,
		component: () => import('@/views/error/401'),
	},
	{
		path: '',
		...routeDefaults,
		redirect: '/index',
		children: [
			{
				path: '/index',
				component: () => import('@/views/index'),
				name: 'Index',
				meta: { title: '首页', icon: 'dashboard', affix: true },
			},
		],
	},
	{
		path: '/user',
		...routeDefaults,
		hidden: true,
		redirect: 'noredirect',
		children: [
			{
				path: 'profile',
				component: () => import('@/views/system/user/profile/index'),
				name: 'Profile',
				meta: { title: '个人中心', icon: 'user' },
			},
		],
	},
];

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
	{
		path: '/system/user-auth',
		component: Layout,
		hidden: true,
		permissions: [ 'system:user:edit' ],
		children: [
			{
				path: 'role/:userId(\\d+)',
				component: () => import('@/views/system/user/authRole'),
				name: 'AuthRole',
				meta: { title: '分配角色', activeMenu: '/system/user' },
			},
		],
	},
	{
		path: '/system/role-auth',
		component: Layout,
		hidden: true,
		permissions: [ 'system:role:edit' ],
		children: [
			{
				path: 'user/:roleId(\\d+)',
				component: () => import('@/views/system/role/authUser'),
				name: 'AuthUser',
				meta: { title: '分配用户', activeMenu: '/system/role' },
			},
		],
	},
	{
		path: '/system/dict-data',
		component: Layout,
		hidden: true,
		permissions: [ 'system:dict:list' ],
		children: [
			{
				path: 'index/:dictId(\\d+)',
				component: () => import('@/views/system/dict/data'),
				name: 'Data',
				meta: { title: '字典数据', activeMenu: '/system/dict' },
			},
		],
	},
	{
		path: '/monitor/job-log',
		component: Layout,
		hidden: true,
		permissions: [ 'monitor:job:list' ],
		children: [
			{
				path: 'index/:jobId(\\d+)',
				component: () => import('@/views/monitor/job/log'),
				name: 'JobLog',
				meta: { title: '调度日志', activeMenu: '/monitor/job' },
			},
		],
	},
	{
		path: '/tool/gen-edit',
		component: Layout,
		hidden: true,
		permissions: [ 'tool:gen:edit' ],
		children: [
			{
				path: 'index/:tableId(\\d+)',
				component: () => import('@/views/tool/gen/editTable'),
				name: 'GenEdit',
				meta: { title: '修改生成配置', activeMenu: '/tool/gen' },
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes: constantRoutes,
	scrollBehavior(to, from, savedPosition) {
		return savedPosition || { top: 0 };
	},
});

export default router;
