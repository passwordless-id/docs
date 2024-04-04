<script>
export default {
  props: ['icon']
}
</script>

<template>
	<article class="card">
		<img :src="icon">
		<div>
			<slot />
		</div>
	</article>
</template>

<style is:global>
	.card {
		display: flex;
		align-items: center;
		gap: 50px;
		margin: 5rem 0;
	}
	.card > img {
		height: 100px;
		width: 100px;
	}
	.card > div {
		/*text-align: left;*/
	}

	.card:nth-child(odd){
		margin-left: 150px;
		flex-direction: row-reverse;
	}

	.card:nth-child(even){
		margin-right: 150px;
		text-align: right;
		
	}
</style>