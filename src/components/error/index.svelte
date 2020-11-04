<script>
  import ErrorMessage from './ErrorMessage.svelte';

  export let errorMessages;

</script>

<div class="error">
    <ul class="error-list">
        {#if Array.isArray(errorMessages)}
            {#each errorMessages as message }
                <ErrorMessage message={message}/>
            {/each}
        {:else}
            <ErrorMessage message={errorMessages}/>
        {/if}
    </ul>
</div>

<style>
    .error {
        width: 15em;
        color: #D8000C;
        background-color: #FFD2D2;
        padding: 8px;
    }

    .error-list {
        margin: 0;
    }

</style>
