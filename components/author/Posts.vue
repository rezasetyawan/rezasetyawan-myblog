<script setup lang="ts">
interface Props {
  blogs: GetBlog[] | undefined | [];
  isLoading: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits(["update-post-status", "delete-post"]);
const { blogs } = toRefs(props);

const handlePublishStatusChange = (postId: string) => {
  emit("update-post-status", postId);
};

const handleDeletePost = (postId: string) => {
  emit("delete-post", postId);
};
</script>
<template>
  <h2
    class="font-rubik font-bold text-2xl my-5 text-center sm:my-8 lg:text-3xl lg:my-10"
  >
    POSTS
  </h2>
  <section
    class="sm:grid grid-cols-1 mx-2 gap-4 justify-items-center relative sm:grid-cols-2 sm:mx-5 xl:grid-cols-3 lg:mx-10 overflow-hidden pb-32"
    v-if="!props.isLoading"
  >
    <AuthorPostItem
      v-for="blog in blogs"
      :key="blog.id"
      :blog="blog"
      @updatePublishStatus="(id: string) => handlePublishStatusChange(id)"
      @deletePost="(id: string) => handleDeletePost(id)"
    />
  </section>
  <section
    v-if="props.isLoading"
    class="grid grid-cols-1 mx-2 gap-4 justify-items-center relative sm:grid-cols-2 sm:mx-5 xl:grid-cols-3 lg:mx-10 overflow-hidden pb-32"
  >
    <AuthorPostItemSkeleton :counts="6" />
  </section>
</template>
