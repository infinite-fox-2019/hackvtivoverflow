<template>
  <div class="card">
    <div class="card-header">Navigation Menu</div>
    <div class="card-body">
      <p>
        <a @click.prevent="$router.push('/question/create')" href
          >Create Question</a
        >
      </p>
      <p>
        <a @click.prevent="$router.push('/question/my')" href>My Question</a>
      </p>
      <p>
        <a @click.prevent="$router.push('/answer/my')" href>My Answer</a>
      </p>
      <p>
        <a @click.prevent="$router.push('/tag/my')" href>Watched Tags</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "menu-bar"
};
</script>

<style></style>
