<script setup>
import { HomeIcon } from '@heroicons/vue/24/solid'
import {
	HashtagIcon,
	BellIcon,
	InboxIcon,
	BookmarkIcon,
	DocumentTextIcon,
	UserIcon,
	EllipsisHorizontalCircleIcon,
	PencilIcon,
} from '@heroicons/vue/24/outline'

const { defaultTransition } = useTailwindConfig()
</script>

<template>
	<div class="flex flex-col h-screen">
		<div class="p-2 my-2 rounded-full hover:bg-blue-50 w-min dark:hover:bg-white/50" :class="defaultTransition">
			<NuxtLink to="/">
				<div class="w-8 h-8"><LogoTwitter /></div>
			</NuxtLink>
		</div>

		<div class="mt-2 space-y-3">
			<!-- WTF JE OVO ACTIVE PROPS TRUE KAO???? Pogledaj Tab.vue, gde kao prihvatamo ovaj prop. Ali ja nzm kako to radi a nismo napisali ovde active="true" -->
			<SidebarLeftTab active>
				<template v-slot:icon>
					<HomeIcon />
				</template>
				<template v-slot:name> Home </template>
			</SidebarLeftTab>

			<SidebarLeftTab>
				<template v-slot:icon>
					<HashtagIcon />
				</template>
				<template v-slot:name> Expore </template>
			</SidebarLeftTab>

			<SidebarLeftTab>
				<template v-slot:icon>
					<BellIcon />
				</template>
				<template v-slot:name> Notifications </template>
			</SidebarLeftTab>

			<SidebarLeftTab>
				<template v-slot:icon>
					<InboxIcon />
				</template>
				<template v-slot:name> Messages </template>
			</SidebarLeftTab>

			<SidebarLeftTab>
				<template v-slot:icon>
					<BookmarkIcon />
				</template>
				<template v-slot:name> Bookmark </template>
			</SidebarLeftTab>

			<SidebarLeftTab>
				<template v-slot:icon>
					<DocumentTextIcon />
				</template>
				<template v-slot:name> Lists </template>
			</SidebarLeftTab>

			<SidebarLeftTab>
				<template v-slot:icon>
					<UserIcon />
				</template>
				<template v-slot:name> Profile </template>
			</SidebarLeftTab>

			<SidebarLeftTab>
				<template v-slot:icon>
					<EllipsisHorizontalCircleIcon />
				</template>
				<template v-slot:name> More </template>
			</SidebarLeftTab>

			<div class="hidden xl:block">
				<UIButton liquid size="lg">
					<span class="font-bold"> Tweet </span>
				</UIButton>
			</div>
			<div class="block xl:hidden">
				<UIButton>
					<div class="w-6 h-6 font-bold">
						<PencilIcon />
					</div>
				</UIButton>
			</div>
		</div>
	</div>
</template>
