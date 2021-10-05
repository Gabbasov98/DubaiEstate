function slider() {
    var swiper = new Swiper('.feedback .swiper-container', {
        // slidesPerView: 1,
        spaceBetween: 0,
        effect: "fade",
        speed: 1000,
        pagination: {
            el: '.feedback .swiper-pagination',
            type: 'fraction',
            clickable: true,
        },
        navigation: {
            nextEl: '.feedback .swiper-button-next',
            prevEl: '.feedback .swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0,

            },
            480: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            1200: {
                // slidesPerView: 1,
                spaceBetween: 0
            },
        }
    })
}

$(document).ready(function() {
    // $(" select.language-select option[value='ENG']").attr("selected")
    // $(".language-select").val('ENG').niceSelect('update');
    slider()
    $(".language-select").niceSelect()

    $(".form__step-important-item-rating-item").click(function() {
        let ratingItem = parseInt($(this).attr("data-rating-value"))
        $(this).parent(".form__step-important-item-rating").attr("data-total-rating", ratingItem)
    })


    // Все инпуты формы опроса

    // Какая недвижимость Вас интересует?
    let whyInputs
    $("input[name='why']").change(function() {
        let whyInputChecked = $("input[name='why']:checked")
        whyInputs = whyInputChecked.attr("data-radio-value")
    });

    // Какой вид недвижимости Вас интересует?
    let whichInputs
    $("input[name='which']").change(function() {
        let whichInputChecked = $("input[name='which']:checked")
        whichInputs = whichInputChecked.attr("data-radio-value")

    });

    // Что для Вас важно?
    let profitability
    let lowPrice
    let goodDistrict
    let liquidity
    let estateQuantity
    let notImportant
    $(".form__step-important-item-rating .form__step-important-item-rating-item").click(function() {
        let ratingParent = $(this).parents(".form__step-important-item-rating")
        let ratingCode = ratingParent.attr("data-rating-code")
        if (ratingCode === "1") {
            profitability = parseInt(ratingParent.attr("data-total-rating"))
        } else if (ratingCode === "2") {
            lowPrice = parseInt(ratingParent.attr("data-total-rating"))
        } else if (ratingCode === "3") {
            goodDistrict = parseInt(ratingParent.attr("data-total-rating"))
        } else if (ratingCode === "4") {
            liquidity = parseInt(ratingParent.attr("data-total-rating"))
        } else if (ratingCode === "5") {
            estateQuantity = parseInt(ratingParent.attr("data-total-rating"))
        }

    })
    $("#not-important").change(function() {
        if ($("#not-important").prop("checked")) {
            notImportant = true
        } else {
            notImportant = false
        }
        // console.log($(this).val())
    })

    // Укажите Ваш планируемый бюджет инвестирования
    let budgetInputs
    $("input[name='budget']").change(function() {
        let budgetInputChecked = $("input[name='budget']:checked")
        budgetInputs = budgetInputChecked.attr("data-radio-value")
        console.log(budgetInputs)
    });

    // Сколько должно быть комнат?
    let roomInputs
    $("input[name='room']").change(function() {
        let roomInputChecked = $("input[name='room']:checked")
        roomInputs = roomInputChecked.attr("data-radio-value")
        console.log(roomInputs)
    });



    // Площадь недвижемости
    let areaFrom = $("#areaFrom")
    let areaTo = $("#areaTo")
    $("#areaFrom").change(function() {
        setActiveLabel($(this))
        let inputValue = $(this).val()
        areaFrom = inputValue
    })
    $("#areaTo").change(function() {
        setActiveLabel($(this))
        let inputValue = $(this).val()
        areaTo = inputValue
    })

    // КОНТАКНЫЕ ДАННЫЕ
    let wishInput
    let nameInput
    let phoneInput
    $("#wish-input").change(function() {
        let inputValue = $(this).val()
        wishInput = inputValue
    })
    $("#name-input").change(function() {
        let inputValue = $(this).val()
        nameInput = inputValue
    })
    $("#phone-input").change(function() {
        let inputValue = $(this).val()
        phoneInput = inputValue
    })



    let formValue
    $(".form__steps").submit(function(event) { // задаем функцию при срабатывании события "submit" на элементе <form>
        event.preventDefault();
        formValue = {
            'Какая недвижимость Вас интересует?': whyInputs,
            'Какой вид недвижимости Вас интересует?': whichInputs,
            'Что для Вас важно': {
                'Доходность': profitability,
                'Стоимость ниже рынка': lowPrice,
                'Благоприятный района': goodDistrict,
                'Ликвидность': liquidity,
                'Количество недвижимости': estateQuantity,
                'Не важно, главное доходность': notImportant
            },
            "Укажите Ваш планируемый бюджет инвестирования": budgetInputs,
            "Сколько должно быть комнат?": roomInputs,
            "Желаемые размеры недвижимости": {
                "от ": areaFrom,
                "до": areaTo
            },
            "Контактные данные": {
                "Индивидуальные пожелания": wishInput,
                "Имя": nameInput,
                "Номер телефона": phoneInput
            }
        }
        console.log(formValue)


    });

    $(".form__step-next").click(function() {
        let btnId = $(this).attr("data-next")
        let currentStep = $(this).parents(".form__step")
        if (btnId === 'why') {
            let whyInput = $("input[name='why']:checked").attr("data-step-line")
            if (whyInput === 'forLife') {
                currentStep.removeClass("form__step--active")
                $(".form__step[data-step-line='forLife'][data-step-id='2']").addClass("form__step--active")
            } else if (whyInput === 'forInvestment') {
                currentStep.removeClass("form__step--active")
                $(".form__step[data-step-line='forInvestment'][data-step-id='2']").addClass("form__step--active")
            } else if (whyInput === 'forBussines') {
                currentStep.removeClass("form__step--active")
                $(".form__step[data-step-line='forBussines'][data-step-id='2']").addClass("form__step--active")
            }
        }
        if (btnId === 'goToLastStep') {
            currentStep.removeClass("form__step--active")
            $(".form__step[data-step-line='lastStep']").addClass("form__step--active")
        }
        if (btnId === 'whichForLife') {
            currentStep.removeClass("form__step--active")
            $(".form__step[data-step-line='forLife'][data-step-id='3']").addClass("form__step--active")
        }
        if (btnId === 'whichForLifeMoney') {
            currentStep.removeClass("form__step--active")
            $(".form__step[data-step-line='forLife'][data-step-id='4']").addClass("form__step--active")
        }
        if (btnId === 'importantInBussiness') {
            currentStep.removeClass("form__step--active")
            $(".form__step[data-step-line='forBussines'][data-step-id='3']").addClass("form__step--active")
        }
    })
    $(".form__step-prev").click(function() {
        let btnId = $(this).attr("data-prev")
        let currentStep = $(this).parents(".form__step")
        if (btnId === 'doToForLife3') {
            currentStep.removeClass("form__step--active")
            $(".form__step[data-step-line='forLife'][data-step-id='3']").addClass("form__step--active")
        } else if (btnId === 'goToForLife2') {
            currentStep.removeClass("form__step--active")
            $(".form__step[data-step-line='forLife'][data-step-id='2']").addClass("form__step--active")
        } else if (btnId === 'goToFirstStep') {
            currentStep.removeClass("form__step--active")
            $(".form__step[data-step-line='firstStep']").addClass("form__step--active")
        } else if (btnId === 'goToBussines2') {
            currentStep.removeClass("form__step--active")
            $(".form__step[data-step-line='forBussines'][data-step-id='2']").addClass("form__step--active")
        }


    })

    function setActiveLabel(label) {
        if (label.val()) {
            label.siblings("label").addClass("active-label")
        } else {
            label.siblings("label").removeClass("active-label")
        }
    }

    $(".projects__item-all").click(function() {
        $(".projects__item").removeClass("projects__item--hide")
    })



    $(".header__burger").click(function() {
        $(this).toggleClass("header__burger--active")
        $(".header-top__right").slideToggle()
    })

    $(".page-nav").click(function(event) {
        event.preventDefault();
        var idc = $(this).attr('href'),
            top = $(idc).offset().top;
        $('body,html').animate({ scrollTop: top - 165 }, 700);
        if ($(window).innerWidth() < 992) {
            $(".header-top__right").hide()
            $(".header__burger").removeClass("header__burger--active")
        }
    });


})

$(document).scroll(function() {
    scrollTracking()
    scrollToProjects()
    scrollHowWork()
        // projects__animate--start
})

function scrollTracking() {
    var wt = $(window).scrollTop();
    var wh = $(window).height();
    var et = $("#advantages .advantages__items").offset().top;
    var eh = $("#advantages .advantages__items").outerHeight();
    if (wt + wh >= et && wt + wh - eh * 2 <= et + (wh - eh)) {
        $(".advantages__item-num").addClass("advantages__item-num--active")
    }
}

function scrollToProjects() {
    var wt = $(window).scrollTop();
    var wh = $(window).height();
    var et = $(".projects__animate").offset().top;
    var eh = $(".projects__animate").outerHeight();
    if (wt + wh >= et && wt + wh - eh * 2 <= et + (wh - eh)) {
        $(".projects__animate").addClass("projects__animate--start")
    }
}

function scrollHowWork() {
    var wt = $(window).scrollTop();
    var wh = $(window).height();
    var et = $(".how-work__items-wave-animate").offset().top;
    var eh = $(".how-work__items-wave-animate").outerHeight();
    if (wt + wh >= et && wt + wh - eh * 2 <= et + (wh - eh)) {
        $(".how-work__items-wave-animate").addClass("how-work__items-wave-animate--start")
        $(".how-work__item-num").addClass("how-work__item-num--active")
    }
}