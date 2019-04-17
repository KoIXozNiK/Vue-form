<template>
	<div >
		<h1>Form Validation</h1>

		<form
			class="custom__form custom__form-val"
			@submit.prevent="submitForm"
			action=""
		>
			<div class="custom__box-input">
				<input
					class="custom__input"
					type="text"
					name="name"
					v-model="form.name"
					@blur="$v.form.name.$touch()"
					:class="{disabled : $v.form.name.$error, enabled : !$v.form.name.$invalid || !$v.form.name.minLength || !$v.form.name.maxLength}"
				>
				<label class="custom__label">Имя:</label>
				<p
					class="error"
					v-if="!$v.form.name.required && $v.form.name.$error"
				>Это поле обязательно для заполнения</p>
				<p
					class="error"
					v-else-if="!$v.form.name.minLength && $v.form.name.$error"
				>Миниму 3 символа </p>
				<p
					class="error"
					v-else-if="!$v.form.name.maxLength && $v.form.name.$error"
				>Максимум 16 символов</p>
			</div>

			<div class="custom__box-input">
				<input
					class="custom__input"
					type="text"
					name="email"
					v-model.email="form.email"
					@blur="$v.form.email.$touch()"
					:class="{disabled : $v.form.email.$invalid, enabled : !$v.form.email.$invalid || !$v.form.email.email}"
				>
				<label class="custom__label">Почта:</label>
				<p
					class="error"
					v-if="!$v.form.email.required && $v.form.email.$error"
				>Это поле обязательно для заполнения</p>
				<p
					class="error"
					v-else-if="!$v.form.email.email && $v.form.email.$error"
				>Вы ввели некорректный e-mail</p>
			</div>

			<div class="custom__box-input">
				<input
					class="custom__input"
					type="text"
					name="tel"
					v-model="form.tel"
					@blur="$v.form.tel.$touch()"
					:class="{disabled : $v.form.tel.$error, enabled : !$v.form.tel.$invalid}"
				>
				<label class="custom__label">Телефон:</label>
				<p
					class="error"
					v-if="$v.form.tel.$error"
				>Это поле обязательно для заполнения</p>
			</div>

			<div class="custom__box-input">
				<input
					class="custom__input"
					type="text"
					name="company"
					v-model="form.company"
					@blur="$v.form.company.$touch()"
					:class="{disabled : $v.form.company.$error, enabled : !$v.form.company.$invalid || !$v.form.company.minLength || !$v.form.company.maxLength}"
				>
				<label class="custom__label">Компания:</label>
				<p
					class="error"
					v-if="!$v.form.company.required && $v.form.company.$error"
				>Это поле обязательно для заполнения</p>
				<p
					class="error"
					v-else-if="!$v.form.company.minLength && $v.form.company.$error"
				>Миниму 3 символа</p>
				<p
					class="error"
					v-else-if="!$v.form.company.maxLength && $v.form.company.$error"
				>Максимум 32 символов</p>
			</div>
			<button
				type="submit"
				class="custom__btn a-btn-2 animated slow bounceIn"
				:disabled="$v.form.$invalid"
				@click="$v.$reset"
				:class="{disabled : $v.form.$invalid}"
			>Свяжитесь с нами
			</button>
		</form>
	</div>
</template>

<script>
  import { maxLength, minLength, required, email } from 'vuelidate/lib/validators'

  export default {
    name: "customform",
    data() {
      return {
        form: {
          name: null,
          company: null,
          tel: null,
          email: null,
          regTel: '/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$'
        }
      }
    },

    validations: {
      form: {
        name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(16)
        },

        company: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(32)
        },

        tel: {
          required: required
        },

        email: {
          required: required, //$v.form.email.required
          email: email  // $v.form.email.required email
        }
      }
    },

    methods: {
      submitForm() {
        this.form.name = this.name;
        this.form.email = this.email;
        this.form.tel = this.email;
        this.form.company = this.email;
        this.name = this.email = this.tel = this.company = null;

        $('.overlay').css({
          'opacity': 0.722,
          'pointer-events': 'visible'
        })

        $(".custom__form").trigger("reset");

        $('.popup__ok').css({
          'opacity': 1,
          'pointer-events': 'visible'
        })

        axios.post($(this.form).attr('action'))
            .then((responce) => {
              console.log('Ok: ', responce);
            })
            .catch((error) => {
              console.log('Error: ', error);
            })
      }
    }
  }
</script>

<style lang="sass">
	$white: #fff
	$red: rgb(168, 22, 26)
	$dark: #000
	$transition: all .35s ease

	.a-btn-2
		border: 2px solid $red
		padding: 18px 66px
		border-radius: 27.5px
		transition: $transition
		color: $dark
		background-color: transparent
		border-color: $red
		border-width: 2px
		border-style: solid
		background-size: 200% 100%
		background-position: right bottom

		&:focus
			outline: 0

		&:hover
			background-color: $red
			background-image: -webkit-gradient(linear, left top, right top, color-stop(50%, $red), color-stop(50%, transparent))
			background-image: linear-gradient(to right, $red 50%, transparent 50%)
			color: $white
			background-position: left bottom

		&.disabled
			cursor: no-drop

	.custom__form
		display: flex
		flex-direction: column
		align-items: flex-start

	.custom__box-input
		position: relative
		width: 100%

		.error
			transition: $transition
			position: absolute
			bottom: -38px
			right: 0

		&:not(:first-of-type)
			margin-top: 30px

	.custom__input
		border: none
		width: 100%
		border-bottom: 1px solid $dark
		padding: 14px 0
		transition: $transition
		background-color: transparent

		&:focus
			border-bottom: 1px solid $red
			outline: 0
			color: $dark

		&:focus,
		&.enabled

			&~label
				top: -5px
				font-size: 14px

	.custom__label
		position: absolute
		left: 0
		top: 50%
		transform: translateY(-50%)
		transition: $transition
		font-size: 18px
		color: $dark
		pointer-events: none

	.custom__btn
		margin-top: 50px

	@media all and (max-width: 550px)
		.custom__btn
			padding: 18px 53px

	#app
		max-width: 700px
		min-width: 600px

	body
		display: flex
		justify-content: center
		align-items: center
		height: 100vh



	.popup__ok
		position: fixed
		z-index: 9999
		top: 50%
		left: 50%
		transform: translateX(-50%) translateY(-50%)
		background-color: #fff
		padding: 45px 70px
		max-width: calc(100% - 30px)
		width: 850px
		border-radius: 10px
		transition: $transition
		opacity: 0
		pointer-events: none

		&-title--ok
			font-size: 41px
			color: $dark
			text-align: center
			font-family: "GothamProBold"
			text-align: center

		&-icon--ok
			font-size: 120px
			color: #2ecc71
			text-align: center

	@media all and (max-width: 767px)
		.popup__form
			width: 550px

			&-content
				margin-bottom: 20px

			&-title
				font-size: 26px
				margin-bottom: 10px

			&-desc
				font-size: 14px

			.custom__form
				align-items: center

		.popup__ok
			&-title--ok
				font-size: 4vw

			&-icon--ok
				font-size: 13vw

	@media all and (max-width: 550px)
		.popup__form
			padding: 35px 15px 20px

			&-content
				margin-bottom: 20px

			&-title
				font-size: 23px

			.custom__form
				align-items: center

			&-close
				top: 5px
				right: 14px

		.popup__ok
			padding: 20px 15px

			&-close
				display: block

			&-title--ok
				font-size: 8vw

			&-icon--ok
				font-size: 23vw

	.overlay
		opacity: 0
		pointer-events: none
		position: fixed
		top: 0
		left: 0
		right: 0
		bottom: 0
		z-index: 100
		background-color: $dark
</style>