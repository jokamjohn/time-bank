<script context="module">
  export async function preload(page, session) {
    const {user} = session;

    if (!user) {
      return this.redirect(302, '/login')
    }

    return {user};
  }
</script>

<script>
  import {onMount} from 'svelte';
  import JobCard from '../../components/dashboard/JobCard.svelte'
  import {ROUTE_JOB_ADD} from "../../utils/constants";


  let jobs = []

  onMount(async () => {
    const API = await import('../../api')
    try {
      jobs = await API.getAllJobs();
    } catch (e) {
      jobs = [];
    }
  })

</script>

<svelte:head>
    <title>Dashboard | Time Bank</title>
</svelte:head>

<div>
    <div class="row">
        <div class="count">
            <div>Coins</div>
            <div>0</div>
        </div>
        <div class="add">
            <a href={ROUTE_JOB_ADD}>Add Job</a>
        </div>
    </div>

    <div>
        {#if jobs.length === 0}
            <div>No jobs available</div>
        {:else}
            {#each jobs as job}
                <JobCard job={job}/>
            {/each}
        {/if}
    </div>
</div>


<style>
    .row {
        display: flex;
        width: 100%;
    }

    .count {
        display: flex;
        width: 50%;
        padding-left: 20px;
        padding-right: 10px;
        margin-left: 10px;
        margin-right: 10px;
        justify-content: space-between;
        color: #fff;
        background-color: var(--primary-color);
        font-size: 30px;
        font-weight: 700;
    }

    .add {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        background-color: var(--accent-color-1);
        margin-right: 10px;
    }

    a {
        padding-left: 50px;
        padding-right: 50px;
        color: var(--secondary-color);
        font-weight: 700;
    }
</style>
