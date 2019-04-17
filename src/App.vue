<template>
	<div id="app" class="app">
		<div class="wrapp">
			<img src="./assets/logo.png">
			<app-custom-form> </app-custom-form>
		</div>
	</div>
</template>

<script>

  import CustomForm from "./assets/components/CustomForm";

  export default {
    name: 'app',
    components: {
      AppCustomForm: CustomForm
    }
  }
</script>

<style lang="sass">
	.wrapp
		text-align: center
</style>


