<script context="module">
  import {ROUTE_DASHBOARD} from "../utils/constants";

  export async function preload(page, session) {
    const {user} = session;

    if (user) {
      return this.redirect(302, ROUTE_DASHBOARD);
    }

    return {};
  }

</script>

<script>
  import {onMount} from 'svelte';
  import {goto} from '@sapper/app';
  import Error from '../components/error';
  import {getFirebaseLoginError} from "./_helpers";

  let API;

  onMount(async () => {
    API = await import('../api');
  })

  let email = '';
  let password = '';
  let error = '';

  $:isButtonDisabled = !email || !password;

  async function login() {
    try {
      await API.signInUser(email, password);
      error = '';
      goto(ROUTE_DASHBOARD);
    } catch (e) {
      const err = getFirebaseLoginError(e);
      if (err) {
        error = err;
      } else {
        error = 'Something wrong happened while logging you in'
      }
    }
  }

</script>


<svelte:head>
    <title>Sign In | Time Bank</title>
</svelte:head>

<div class="main">
    <h1>Login</h1>

    {#if error}
        <Error errorMessages={error}/>
    {/if}

    <div>
        <form action="" on:submit|preventDefault>
            <div>
                <label for="email">
                    Email Address:
                    <input id="email" type="email" bind:value={email} placeholder="example@gmail.com">
                </label>
            </div>

            <div>
                <label for="password">
                    Password:
                    <input id="password" type="password" bind:value={password}>
                </label>
            </div>

            <div>
                <button type="submit" class="submit" on:click={login} disabled={isButtonDisabled}>Sign In</button>
            </div>
        </form>
    </div>
</div>

<style>
    .main {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    label {
        display: flex;
        flex-direction: column;
        color: var(--secondary-color);
    }

    h1 {
        width: 100%;
        text-align: center;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .submit {
        width: 15.8em;
        padding: 0.8em 0;
    }
</style>

