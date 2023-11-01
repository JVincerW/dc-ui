<template>
	<transition-group name='fade-transform'>
		<inner-link
				v-for='(item, index) in tagsViewStore.iframeViews'
				v-show='route.path === item.path'
				:key='item.path'
				:iframeId="'iframe' + index"
				:src='item.meta.link'
		></inner-link>
	</transition-group>
</template>

<script setup>
import InnerLink from '../InnerLink/index';
import useTagsViewStore from '@/store/modules/tagsView';
import { useRoute } from 'vue-router';

const route         = useRoute();
const tagsViewStore = useTagsViewStore();
</script>
