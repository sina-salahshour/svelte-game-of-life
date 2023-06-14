<script lang="ts">
	import PocketBase, { type OAuth2AuthConfig } from 'pocketbase';
	import { env } from '$env/dynamic/public';
	import { invalidate } from '$app/navigation';
	import { DependKeys } from '$lib/configs/depend-keys';
	import Button from './button.svelte';
	import { enhance } from '$app/forms';
	import Input from './input.svelte';
	import Checkbox from './checkbox.svelte';
	let loading = false;
	const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL);
	async function oauthLogin(method: OAuth2AuthConfig['provider']) {
		try {
			loading = true;
			const resp = await pb.collection('users').authWithOAuth2({
				provider: method
			});
			pb.authStore.save(resp.token, resp.record);
			await fetch('', {
				method: 'POST',
				body: JSON.stringify(resp)
			});
			await invalidate(DependKeys.AUTH);
		} finally {
			loading = false;
		}
	}
	const auth_methods = pb
		.collection('users')
		.listAuthMethods()
		.then((resp) => resp.authProviders.map((provider) => provider.name));
</script>

<div class="w-full min-h-[100dvh] bg-black bg-opacity-80 flex items-center justify-center">
	<section
		class="flex w-full h-full 3xl:min-h-[auto] min-h-[100dvh] 3xl:h-[100dvh] bg-black 3xl:max-w-[1440px] 3xl:max-h-[1020px] 3xl:rounded-lg 3xl:overflow-hidden"
	>
		<div
			class="flex items-center justify-center flex-1 text-white bg-white 3xl:overflow-auto bg-opacity-5"
		>
			<form
				method="POST"
				class="flex flex-col items-center justify-center h-full max-w-[471px] w-full mx-8 my-8 3xl:my-0"
				action="?/password_login"
				use:enhance
			>
				<h1 class="mb-5 text-4xl font-bold">Welcome back</h1>
				<h2 class="mb-10 font-normal text-2xl text-[#3B3A3A]">Enter your information to login</h2>
				<Button
					on:click={() => oauthLogin('google')}
					type="button"
					variant="outlined"
					class="flex items-center justify-center gap-2 mb-5"
					{loading}
					disabled={loading}
				>
					<img class="w-[25px] h-[25px]" src="/icons/google.png" alt="" />
					Sign in with Google
				</Button>
				<div class="mb-3 s-separator">
					<div class="s-rail" />
					<div class="s-text">or</div>
					<div class="s-rail" />
				</div>
				<Input
					required
					class="mb-2"
					type="text"
					name="email"
					id="email"
					placeholder="Enter your username"
				/>
				<Input
					required
					class="mb-8"
					type="password"
					name="password"
					id="password"
					placeholder="Password"
				/>
				<div class="flex justify-between w-full mb-3">
					<div class="flex items-center justify-center">
						<Checkbox class="mr-2 cursor-pointer peer" name="remember" id="remember" />
						<label
							class="text-[#3B3A3A] text-[15px] leading-[18px] cursor-pointer hover:text-opacity-70 peer-hover:text-opacity-70 transition"
							for="remember">Remember me</label
						>
					</div>
					<a
						href="/forget"
						class="text-[#3B3A3A] font-medium text-[15px] leading-[18px] hover:text-opacity-70 transition"
						>forgot password?</a
					>
				</div>
				<Button {loading} disabled={loading}>Continue</Button>
			</form>
		</div>
		<div class="flex-1 hidden lg:block">
			<img src="/login/bg.gif" alt="glider-gun" class="object-cover w-full h-full" />
		</div>
	</section>
</div>

<style lang="postcss">
	.s-separator {
		@apply w-full h-8;
		@apply flex justify-center items-center;
		.s-rail {
			@apply h-0.5 bg-[#242424] flex-1 rounded-3xl;
		}
		.s-text {
			@apply px-4;
		}
	}
</style>
