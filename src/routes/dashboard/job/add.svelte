<script context="module">
  export async function preload(page, session) {
    const { user } = session;

    if (!user) {
      return this.redirect(302, '/login')
    }

    return { user };
  }
</script>

<script>
  import { onMount } from 'svelte';
  import {goto} from '@sapper/app';
  import {jobAddScheme, categories} from "./_helpers";
  import {ROUTE_DASHBOARD} from "../../../utils/constants";

  let API;

  onMount(async () => {
    API = await import('../../../api');
  })

  export let user;

  let title = '';
  let duration = 0;
  let category = categories[0].value;
  let location = '';
  let loading = false;

  async function saveJob() {
    try {
      loading = true;

      await jobAddScheme.validate({
        title, duration, category, location
      });

      await API.saveJobToFirestore({
        title, duration, category, location, ...user.profile
      });

      loading = false;

      title = '';
      duration = 0;
      category = categories[0].value;
      location = '';

      goto(ROUTE_DASHBOARD);

    } catch (e) {
      loading = false;

      if (e.name === 'ValidationError') {
        const errorMessage = e.message;
        const field = e.path;
      }
      console.log('error', e)
    }
  }
</script>

<svelte:head>
    <title>Add Job | Time Bank</title>
</svelte:head>

<div class="main">
    <h1>Add a Job</h1>
    <form action="" on:submit|preventDefault>

        <label for="title">
            Title
        </label>
        <input type="text" bind:value={title} id="title" disabled={loading}>

        <label for="duration">
            Duration
        </label>
        <input id="duration" type="number" min="0" max="10" bind:value={duration} disabled={loading}>

        <label for="category">
            Category
        </label>
        <select name="category" id="category" bind:value={category} disabled={loading}>
            {#each categories as cat}
                <option value={cat.value}>{cat.label}</option>
            {/each}
        </select>

        <label for="location">
            Location
        </label>
        <input id="location" type="text" bind:value={location} disabled={loading}>

        <div class="primary-button-container">
            <button class="primary-button" on:click={saveJob}>{loading ? 'Saving' : 'Save'}</button>
        </div>

    </form>
</div>

<style>
    .main {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    label {
        text-align: left;
        width: 15em;
        color: var(--secondary-color);
    }

    select {
        width: 15.5em;
        padding: 0.5em 0.2em;
        font-size: 16px;
        border: 2px solid var(--primary-color);
        margin-bottom: 0.5em;
        border-radius: 5px;
        background-color: white;
    }

</style>
