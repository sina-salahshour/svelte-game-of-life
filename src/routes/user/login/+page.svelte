<script lang="ts">
	import PocketBase, { ClientResponseError, type OAuth2AuthConfig } from 'pocketbase';
	import { env } from '$env/dynamic/public';
	import { invalidate } from '$app/navigation';
	import { DependKeys } from '$lib/configs/depend-keys';
	import Button from './button.svelte';
	import Input from './input.svelte';
	import Checkbox from './checkbox.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import passwordLoginSchema from '$lib/schemas/login/password-login.schema';
	import PasswordInput from './password-input.svelte';
	import toast from 'svelte-french-toast';

	export let data: PageData;

	const { form, enhance, errors, allErrors, submitting } = superForm(data.form, {
		validators: passwordLoginSchema
	});

	let oauthLoading: OAuth2AuthConfig['provider'] | boolean = false;
	const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL);
	async function oauthLogin(method: OAuth2AuthConfig['provider']) {
		await new Promise(async (resolve, reject) => {
			try {
				oauthLoading = method;
				const resp = await pb.collection('users').authWithOAuth2({
					provider: method,
					urlCallback: (url) => {
						if (typeof window === 'undefined' || !window?.open) {
							throw new ClientResponseError(
								new Error(`Not in a browser context - please pass a custom urlCallback function.`)
							);
						}

						let width = 1024;
						let height = 768;

						let windowWidth = window.innerWidth;
						let windowHeight = window.innerHeight;

						// normalize window size
						width = width > windowWidth ? windowWidth : width;
						height = height > windowHeight ? windowHeight : height;

						let left = windowWidth / 2 - width / 2;
						let top = windowHeight / 2 - height / 2;

						let authWindow = window.open(
							url,
							'oauth2-popup',
							'width=' +
								width +
								',height=' +
								height +
								',top=' +
								top +
								',left=' +
								left +
								',resizable,menubar=no'
						);
						if (authWindow) {
							authWindow.onunload = (e) => {
								reject(e);
							};
						}
					}
				});
				pb.authStore.save(resp.token, resp.record);
				await fetch('?/oauth_login', {
					method: 'POST',
					body: JSON.stringify(resp)
				});
				await invalidate(DependKeys.AUTH);
			} finally {
				oauthLoading = false;
				resolve(undefined);
			}
		}).catch((e) => {
			oauthLoading = false;
		});
	}
	$: disabled = !!oauthLoading || $submitting;
	$: {
		const globalError = $errors._errors;
		if (globalError) {
			toast.error(globalError.join(' '));
		}
	}
	$: console.log($allErrors);
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
					loading={oauthLoading === 'google'}
					{disabled}
				>
					<img class="w-[25px] h-[25px]" src="/icons/google.png" alt="" />
					Sign in with Google
				</Button>
				<Button
					on:click={() => oauthLogin('github')}
					type="button"
					variant="outlined"
					class="flex items-center justify-center gap-2 mb-5"
					loading={oauthLoading === 'github'}
					{disabled}
				>
					<img class="w-[25px] h-[25px]" src="/icons/github.png" alt="" />
					Sign in with Github
				</Button>
				<div class="mb-3 s-separator">
					<div class="s-rail" />
					<div class="s-text">or</div>
					<div class="s-rail" />
				</div>
				<Input
					required
					class="mb-2"
					name="email"
					id="email"
					placeholder="Enter your email"
					bind:value={$form.email}
					error={$errors.email?.join(' ')}
				/>
				<PasswordInput
					required
					class="mb-2"
					name="password"
					id="password"
					placeholder="Password"
					bind:value={$form.password}
					error={$errors.password?.join(' ')}
				/>
				<div class="flex justify-between w-full mb-3">
					<div class="flex items-center justify-center">
						<Checkbox
							class="mr-2 cursor-pointer peer"
							name="remember"
							id="remember"
							bind:checked={$form.remember_me}
						/>
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
				<Button
					loading={$submitting}
					disabled={disabled || !!$allErrors.filter((err) => err.path !== '_errors').length}
					>Continue</Button
				>
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
