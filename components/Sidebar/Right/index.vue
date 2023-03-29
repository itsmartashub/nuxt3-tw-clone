<script setup>
const whatsHappeningItems = ref([
	{ title: 'SpaceX', count: '18.8k Tweets' },
	{ title: '#CodingIsFun', count: '8.8k Tweets' },
	{ title: '#artforall', count: '1.8k Tweets' },
])
const whoToFollowItems = ref([
	{ name: 'Joe Biden', handle: '@JoeBiden', image: 'https://picsum.photos/200/200' },
	{ name: 'Joe Biden', handle: '@JoeBiden', image: 'https://picsum.photos/200/200' },
	{ name: 'Joe Biden', handle: '@JoeBiden', image: 'https://picsum.photos/200/200' },
])
</script>

<template>
	<div class="flex flex-col">
		<!-- Preview Card : What's Happening -->

		<SidebarRightPreviewCard title="What's Happening">
			<!-- passing a default slot -->
			<SidebarRightPreviewCardItem v-for="whatsHappening in whatsHappeningItems" :key="whatsHappening.title">
				<div>
					<h2 class="font-bold text-gray-800 text-md dark:text-white">{{ whatsHappening.title }}</h2>
					<p class="text-xs text-gray-400">{{ whatsHappening.count }}</p>
				</div>
			</SidebarRightPreviewCardItem>
		</SidebarRightPreviewCard>

		<!-- Preview Card : Who to follow -->
		<SidebarRightPreviewCard title="Who to follow">
			<SidebarRightPreviewCardItem v-for="whoToFollow in whoToFollowItems" :key="whoToFollow">
				<div class="flex flex-row items-center justify-between p-2">
					<div class="flex flex-row">
						<img
							:src="whoToFollow.image"
							:alt="whoToFollow.name"
							class="rounded-full w-10 h-10 mr-2 object-cover object-center"
						/>

						<div class="flex flex-col ml-2">
							<h1 class="text-sm font-bold text-gray-900 dark:text-white">{{ whoToFollow.name }}</h1>
							<p class="text-xs text-gray-400">{{ whoToFollow.handle }}</p>
						</div>
					</div>

					<div class="flex h-full">
						<button
							class="px-4 py-2 font-bold rounded-full text-xs text-white bg-black dark:text-black dark:bg-white"
						>
							Follow
						</button>
					</div>
				</div>
			</SidebarRightPreviewCardItem>
		</SidebarRightPreviewCard>
	</div>
</template>
