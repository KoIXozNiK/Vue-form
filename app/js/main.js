;(function ($, window, document, undefined) {
  'use strict';

Vue.use(vuelidate.default)

new Vue({
  el: '#app',

  data:{
    form: {
      name: null,
      company: null,
      tel: null,
      email: null,
      regTel: '/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$'
    }
  },

  validations: {
    form: {
      name: {
        required: validators.required,
        minLength: validators.minLength(3),
        maxLength: validators.maxLength(16)
      },

      company: {
        required: validators.required,
        minLength: validators.minLength(3),
        maxLength: validators.maxLength(32)
      },

      tel: {
        required: validators.required
      },

      email: {
        required: validators.required, //$v.form.email.required
        email: validators.email  // $v.form.email.required email
      }
    }
  },

  methods: {
    submitForm: function(event) {
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
        .then((responce) =>{
          console.log(responce);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }
})

  $('.overlay, .popup__form-close').on('click', function (e) {
    e.preventDefault()

    $('.popup__form, .overlay, .popup__ok').css({
      'opacity': 0,
      'pointer-events': 'none'
    })

    $('html').css('overflow', 'visible')
  })

})(jQuery, window, document);