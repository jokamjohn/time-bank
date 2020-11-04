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
  import {goto} from '@sapper/app';
  import Error from '../components/error';
  import {onMount} from 'svelte';
  import {getFirebaseRegisterError, registerSchema, getErrorMessages} from "./_helpers";

  let API;

  let name = '';
  let email = '';
  let password = '';
  let confirmPassword = '';

  let errorMessages = [];

  $:passwordError = password !== confirmPassword;

  $:error = errorMessages.filter(Boolean).length > 0;

  $:isButtonDisabled = !name || !email || !password || !confirmPassword || passwordError;

  let loading = false;

  onMount(async () => {
    API = await import('../api');
  })

  async function onRegister() {
    try {
      errorMessages = [];
      await registerSchema.validate({
        name, email, password, confirmPassword
      });

      if (passwordError) {
        console.log('passwords do not match');
        return;
      }

      loading = true;

      const results = await API.registerUser(email, password);

      if (results.user) {
        const user = results.user;
        await API.saveUserToFirestore(user.uid, user.email, name);
        await user.updateProfile({
          displayName: name
        })
        goto(ROUTE_DASHBOARD);
      }

      loading = false;

    } catch (e) {
      loading = false;

      if (e.name === 'ValidationError') {
        errorMessages = [...errorMessages, e.message];
        const field = e.path;
      }

      errorMessages = [...errorMessages, getFirebaseRegisterError(e)];
    }
  }

</script>


<svelte:head>
    <title>Sign Up | Time Bank</title>
</svelte:head>

<div class="main">
    <h1>Sign Up</h1>

    {#if passwordError || error }
        <Error errorMessages={getErrorMessages(errorMessages, passwordError)}/>
    {/if}

    <div>
        <form class="form" on:submit|preventDefault={onRegister}>
            <div>
                <label for="name">
                    Name:
                    <input id="name" type="text" placeholder="John" bind:value={name} disabled={loading}>
                </label>
            </div>

            <div>
                <label for="email">
                    Email Address:
                    <input id="email" type="email" placeholder="example@gmail.com" bind:value={email}
                           disabled={loading}>
                </label>
            </div>

            <div>
                <label for="password">
                    Password:
                    <input id="password" type="password" bind:value={password} disabled={loading}>
                </label>
            </div>

            <div>
                <label for="confirm password">
                    Confirm Password:
                    <input id="confirm password" type="password" bind:value={confirmPassword} disabled={loading}>
                </label>
            </div>

            <div>
                <button type="submit" class="submit" disabled={isButtonDisabled}>{loading ? 'Registering' : 'Register' }</button>
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

    h1 {
        color: var(--primary-color);
        font-weight: 500;
        font-size: 35px;
    }

    ::placeholder {
        font-weight: 100;
        font-style: italic;
        color: gray;
    }

    label {
        display: flex;
        flex-direction: column;
        color: var(--primary-color);
    }

    h1 {
        width: 100%;
        text-align: center;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    input {
        width: 15em;
        padding: 0.5em 0.2em;
        margin-bottom: 0.5em;
        font-size: 16px;
        text-align: left;
    }

    .submit {
        width: 15.8em;
        padding: 0.8em 0;
    }
</style>

