<script setup lang="ts">
import { updateBlogById, deleteBlogByID } from '../../composables/useBlogs'
import { deleteImage } from '../../composables/usePostImage'
import { getFileNameFromUrl } from '../../utils/getFileName'
import { truncateString } from "../../utils/truncateText"

const client = useSupabaseClient()

interface Props {
  blog: GetBlog;
  isLoading?: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits(["updatePublishStatus", "deletePost"])
const showMobileMenu = ref<boolean>(false)

const updatePostPublishStatus = async () => {
  try {
    await updateBlogById(client, props.blog.id, { is_published: !props.blog.is_published })
    emit('updatePublishStatus', props.blog.id)

  } catch (error) {
    console.error(error);
  }
}


const deletePostHandler = async (title: string, postId: string) => {
  const deletePost = confirm('Are you sure want to delete ' + title)

  if (deletePost) {
    try {
      await deleteBlogByID(client, postId)

      const fileKey = getFileNameFromUrl(props.blog.image_url, 'post-images')
      await deleteImage(client, fileKey ? fileKey : '')
      emit('deletePost', props.blog.id)
    }
    catch (error) {
      console.error(error)
    }
  }
}
</script>
<template>
  <div class="border-2 rounded-lg p-1 my-2">
    <NuxtImg :src="props.blog.image_url ? props.blog.image_url : '@public/images/image-placeholder.jpg'"
      class="max-sm:w-full min-h-[50px] sm:min-h-[70px] object-cover brightness-90 transition-all rounded-sm aspect-[4/2] block"
      loading="lazy" quality="50" :alt="props.blog.title" placeholder />

    <div class="flex justify-between mt-1">
      <div>
        <NuxtLink :to="`/author/post/${props.blog.id}`">
          <h3 class="text-left font-medium py-1 font-rubik text-base sm:hidden sm:text-lg lg:text-xl">
            {{ truncateString(props.blog.title, 18) }}
          </h3>
        </NuxtLink>
        <h3 class="text-left font-medium py-1 font-rubik text-base hidden sm:block sm:text-lg lg:text-xl">
          {{ truncateString(props.blog.title, 20) }}
        </h3>
        <div class="flex gap-3 items-center justify-start font-medium text-xs sm:text-sm">
          <p v-if="props.blog.is_published">Published</p>
          <p v-else class=" text-orange-600">Draft</p>

          &#8226
          <p>
            {{ new Date(parseInt(props.blog.created_at)).toLocaleDateString('en-GB') }}
          </p>
          <div class="flex gap-3 items-center justify-center font-medium text-sm text-black">
            <p>
              {{ props.blog.comment_counts }}
              <Icon name="basil:chat-outline" size="24" />
            </p>
          </div>
        </div>
      </div>
      <div class="z-10 flex-col justify-center gap-6 mr-4 hidden sm:flex">
        <div class="flex items-center gap-2">
          <button v-if="props.blog.is_published" @click="updatePostPublishStatus" class="group relative">
            <Icon name="material-symbols:send-and-archive" class="h-6 w-6" />
            <span class="tooltip">unpublish</span>
          </button>

          <button v-else @click="updatePostPublishStatus" class="group relative">
            <Icon name="material-symbols:send" class="h-6 w-6" />
            <span class="tooltip">publish</span>
          </button>

          <NuxtLink :to="`/author/post/edit/${props.blog.id}`" class="group relative">
            <Icon name="material-symbols:edit" class="h-6 w-6" />
            <span class="tooltip">edit
              post</span>
          </NuxtLink>

          <button @click="() => deletePostHandler(blog.title, blog.id)" class="group relative">
            <Icon name="mdi:trash" class="h-6 w-6" />
            <span class="tooltip">delete</span>
          </button>
        </div>
      </div>
      <div class="relative sm:hidden  z-[2000]">
        <button @click="() => showMobileMenu = !showMobileMenu">
          <Icon name="pepicons-pencil:dots-y" size="24" />
        </button>
        <div class="absolute translate-x-[300px] p-3 transition-all duration-200 top-8 bg-white right-0 shadow-md"
          :class="{ 'translate-x-[0px]': showMobileMenu }">
          <button class="flex gap-2 w-32 items-center p-1 my-2 text-sm" v-if="props.blog.is_published"
            @click="updatePostPublishStatus">
            <Icon name="material-symbols:send-and-archive" class="h-6 w-6" /> Unpublish
          </button>
          <button class="flex gap-2 w-32 items-center p-1 my-2 text-sm" v-else @click="updatePostPublishStatus">
            <Icon name="material-symbols:send" class="h-6 w-6" />
            Publish
          </button>

          <NuxtLink :to="`/author/post/edit/${props.blog.id}`" class="flex gap-2 w-32 items-center p-1 my-2 text-sm">
            <Icon name="material-symbols:edit" class="h-6 w-6" />
            Edit
          </NuxtLink>

          <button class="flex gap-2 w-git items-center p-1 my-2 text-sm"
            @click="() => deletePostHandler(blog.title, blog.id)">
            <Icon name="mdi:trash" class="h-6 w-6" />
            Delete
          </button>

        </div>
      </div>
    </div>

  </div>
</template>
<style scoped>
.tooltip {
  @apply hidden bg-gray-200 group-hover:inline group-hover:absolute right-0 top-8 z-20 px-[0.8em] py-[0.4em] rounded-sm whitespace-nowrap text-black
}
</style>