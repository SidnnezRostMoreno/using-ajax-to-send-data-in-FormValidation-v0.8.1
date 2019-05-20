$(document).ready(function() {

    var bS  = $('#btnSubmit'),
        cF  = $('#contactForm'),
        sM  = $('#submitModal'),
        sml = $('#submitModalLabel'),
        smp = $('#submitModalParagraph')

    // Send form with validation
    cF.find('[name="realEstate"]')
        .selectpicker()
        .change(function(e) {
            cF.formValidation('revalidateField', 'realEstate');
        })
        .end()
        .formValidation({
            framework: 'bootstrap4',
            excluded: ':disabled',
            icon: {
                valid: 'fa fa-check',
                invalid: 'fa fa-times',
                validating: 'fa fa-refresh'
        },
        fields: {
            nome: {
                validators: {
                    notEmpty: {
                        message: 'The name is required.'
                    },
                    regexp: {
                        message: 'Only alphabetical letters in this field.',
                        regexp: /^[A-Za-z\s]+$/
                    },
                    stringLength: {
                        min: 2,
                        message: 'Username must be longer than 2 characters.'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'The e-mail is required.'
                    },
                    emailAddress: {
                        message: 'Please enter a valid email address.'
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: 'The phone number is required.'
                    },
                    stringLength: {
                        min: 14,
                        message: 'Landline or cell phone with DDD.'
                    }
                }
            },
            realEstate: {
                validators: {
                    notEmpty: {
                        message: 'Selecting a real estate property is required.'
                    }
                }
            }
        }
    })
    .on('success.form.fv', function(e) {
        e.preventDefault();

        var cF = $(e.target),
            fv = cF.data('formValidation');

        $.ajax({
            url: cF.attr('action'),
            type: 'POST',
            data: cF.serialize(),
            success: function(){
                sM.modal('show')
                sml.removeClass('hellip-loading').addClass('success').text('Your data has been sent successfully!')
                smp.text('We will get back to you shortly.')
                setTimeout(function() {
                    sM.modal('hide')
                    sml.removeClass('success').addClass('hellip-loading');
                }, 7500);
            },
            error: function(){
                sM.modal('show')
                sml.removeClass('hellip-loading').addClass('error').text('There was an error while trying to send your data.')
                smp.text('Please try again later.')
                setTimeout(function() {
                    sM.modal('hide')
                    sml.removeClass('error').addClass('hellip-loading');
                }, 7500);
            }
        });
    });
});



// BR Phone mask
function mask(o,f){
    v_obj=o
    v_fun=f
    setTimeout('execmask()',1)
}

function execmask(){
    v_obj.value=v_fun(v_obj.value)
}

function mtel(v){
    v=v.replace(/\D/g,'');
    v=v.replace(/^(\d{2})(\d)/g,'($1) $2');
    v=v.replace(/(\d)(\d{4})$/,'$1-$2');
    return v;
}

function id( el ){
    return document.getElementById( el );
}

window.onload = function(){
    id('phone').onkeyup = function(){
        mask( this, mtel );
    }
}
