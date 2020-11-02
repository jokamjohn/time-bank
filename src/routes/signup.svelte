<script>

</script>


<svelte:head>
    <title>Sign Up | Time Bank</title>
</svelte:head>

<div class="main">
    <h1>Sign Up</h1>

    <div>
        <form action="" class="form">
            <div>
                <label for="email">
                    Email Address:
                    <input id="email" type="email" placeholder="example@gmail.com">
                </label>
            </div>

            <div>
                <label for="password">
                    Password:
                    <input id="password" type="password" >
                </label>
            </div>

            <div>
                <label for="password">
                    Confirm Password:
                    <input id="password" type="password" >
                </label>
            </div>

            <div>
                <button type="submit" class="submit">Register</button>
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

