<script>
    export let job;
</script>

<div class="container">
    <div class="title">
        <h2>{job.title}</h2>
    </div>
    <div class="row">
        <p class="label">Duration</p>
        <p class="values">{job.duration}</p>
    </div>
    <div class="row">
        <p class="label">Category</p>
        <p class="values">{job.category}</p>
    </div>
    <div class="row">
        <p class="label">Location</p>
        <p class="values">{job.location}</p>
    </div>
    <div class="primary-button-container">
        <button class="primary-button">Apply</button>
    </div>
</div>

<style>
    .container {
        -webkit-box-shadow: 0 10px 6px -6px #777;
        -moz-box-shadow: 0 10px 6px -6px #777;
        box-shadow: 0 1px 6px 1px #777;
        padding: 10px 20px;
        margin: 10px 10px 0 10px;
    }

    .row {
        display: flex;
        justify-content: space-between;
    }

    p {
        margin: 0;
        padding: 5px 0;
    }

    .title {
        display: flex;
        justify-content: center;
        padding-top: 10px;
        padding-bottom: 10px;
        color: var(--primary-color);
    }

    h2 {
        font-weight: 900;
        text-transform: capitalize;
    }

    .label {
        font-size: 16px;
        font-weight: 700;
        color: var(--primary-color);
    }

    .values {
        font-weight: 300;
        color: var(--secondary-color);
        text-transform: capitalize;
    }
</style>
