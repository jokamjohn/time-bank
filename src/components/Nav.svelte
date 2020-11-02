<script>
	import { onMount } from 'svelte';
	import { goto, stores } from '@sapper/app';
	const { preloading, page, session } = stores();

	let API;

	onMount(async () => {
		API = await import('../utils/firebase');
	})

	export let segment;

	async function logout() {
		await API.signOutUser();
		goto('/')
	}
</script>

<nav>
	<h1><a href="/">timebank</a></h1>
	<ul>
		{#if $session.user}
			<li><a aria-current="{segment === 'dashboard' ? 'page' : undefined}" href="dashboard">Dashboard</a></li>
			<li><button on:click={logout}>logout</button></li>
		{:else}
			<li><a aria-current="{segment === 'login' ? 'page' : undefined}" href="login">Sign In</a></li>
		{/if}
		<li><a aria-current="{segment === 'about' ? 'page' : undefined}" href="about">about</a></li>

		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
<!--		<li><a rel=prefetch aria-current="{segment === 'blog' ? 'page' : undefined}" href="blog">blog</a></li>-->
	</ul>
</nav>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding-left: 10px;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		left: 0;
		height: 50px;
		z-index: 100;
		width: 100%;
		background-color: #fff;
	}

	h1 {
		margin-bottom: 0;
		font-weight: 700;
		font-size: 20px;
		display: flex;
		align-self: center;
		font-style: italic;
		color: var(--primary-color);
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}

	h1 > a {
		padding: 0;
	}
</style>
