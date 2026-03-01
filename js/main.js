$(window).scroll(function() {
    if ($(window).scrollTop() > 50) {
      $(".header").addClass("sticky_header");
    }
    else {
      $(".header").removeClass("sticky_header");
    }
});

$(window).load(function(){
  if(window.location.hash) {
      hash = window.location.hash;
      // alert(hash);
      $('html, body').animate({
          scrollTop: $(hash+"-div").offset().top - 80
      });
  }
});



$(window).scroll(function(){


        $('.top_fixon').each(function(){

          var offsetTopPosition = $(this).offset().top - $(window).scrollTop();

          if (offsetTopPosition < 220) {
                $(this).children().addClass('active');
          }

          if (offsetTopPosition > 220) {
                $(this).children().removeClass('active');
          }

        });

});

$(window).scroll(function(){

        $('.projects_menu').each(function(){

          var offsetTopPosition = $(this).offset().top - $(window).scrollTop();

          if (offsetTopPosition < 140) {
                $(this).children().addClass('active');
          }

          if (offsetTopPosition > 140) {
                $(this).children().removeClass('active');
          }

        });

});

$(window).on("load", function(){
  var originalBottom = 220; // get this depending on your circumstances
  var footerHeight = 400; // get this depending on your circumstances
  $(window).scroll(function () { 
    var distanceToBottom = $(document).height() - $(window).height() - $(window).scrollTop();
    if (distanceToBottom <= footerHeight) // when reaching the footer
      {
        $(".side_bar .inside").css('top', (220 - (footerHeight - distanceToBottom)) + 'px');
      }
    else
      {
        $(".side_bar .inside").css('top', originalBottom + 'px');
      }
  });
});

$( document ).ready(function() {

$("select").selectBox({
        keepInViewport: false,
        mobile: true
    });

$("#selectproject").change(function() {
    var value = $(this).val();
    $(".insideselectbox").removeClass('active');
    $(".insideselectbox").fadeOut();
    $("#"+value).next().addClass('active');
    $("#"+value).next().fadeIn();
    $("#"+value).attr('name','pronam');
});

$("#selectproject_pop").change(function() {
    var value = $(this).val();
    $(".insideselectbox").removeClass('active');
    $(".insideselectbox").fadeOut();
    $("#"+value).next().addClass('active');
    $("#"+value).next().fadeIn();
    $("#"+value).attr('name','pronam');
});




});

$( document ).ready(function() {

 





$(".key_highlightscommercial .btn").click(function(){
  $(this).fadeOut();
  $(".boxoddeven").parent().children().fadeIn();
});

$(".getintouch_popup_link").click(function(){
  rel = $(this).attr('rel');
  $("#getintouchpopup").fadeOut(0);
  $("#"+rel).fadeIn();
  $('body').css({'overflow':'hidden'});
}); 

$("#getintouchpopup .closebtn").click(function(){
  $("#getintouchpopup").fadeOut(0);
  $('body').css({'overflow':'visible'});
}); 
  
$(".careers .viewbtn a").click(function(){
  rel = $(this).attr('rel');
  $("#popform").fadeOut(0);
  $(".popform .inside .desc .jobdesc").fadeOut(0);
  $("#popform form")[0].reset()
  $("#"+rel).parent().parent().parent().fadeIn();
  $("#"+rel).fadeIn();
  let new_line = rel.replace(/_/g," ");
  console.log(new_line)
  // $("#myInput").val("1");
  $("#contactFormJob .formtitle input[type=hidden]").val(`${new_line}`);
  $('body').css({'overflow':'hidden'});
}); 

$("#popform .closebtn").click(function(){
  $("#popform").fadeOut(0);
  $('body').css({'overflow':'visible'});
}); 
  

$(".accorddiv .accordhead").click(function(){
  if($(this).parent().hasClass("accordshow")) {
    $(".accorddiv").removeClass('accordshow');
    $('.accorddesc').slideUp();
    return false;
  }
  $('.accorddesc').slideUp();
  $(".accorddiv").removeClass('accordshow');
  $(this).next().slideDown();
  $(this).parent().addClass('accordshow');
}); 

$(".taba li").click(function(){
    rel = $(this).children().attr('rel');

    $(".taba li").removeClass('active');
    $(".tabcontent").fadeOut(0);

    $("#"+rel).fadeIn();
    $(this).addClass('active');

});

$(".closebtn").click(function(){
    rel = $(this).attr('rel');
    $("#"+rel).fadeOut(0);
    $('body').css({'overflow':'visible'});
});

$(".linkpg").click(function(){
    rel = $(this).attr('rel');
    $("#"+rel).fadeIn();
    $('body').css({'overflow':'hidden'});
});


$(".mainmenu li").click(function(){
    rel = $(this).children().attr('rel');

    $(".mainmenu li").removeClass('active');
    $(".insidemenu ul").fadeOut(0);
    $(".projectLocator .maping .points").fadeOut(0);

    $("#"+rel).fadeIn();
    $(this).addClass('active');

});

$(".insidemenu li").click(function(){
    rel = $(this).children().attr('rel');

    $(".insidemenu li").removeClass('active');
    $(".points").fadeOut(0);

    $("."+rel).fadeIn();
    $(this).addClass('active');

});


$(".ul_menutabs a").on("click", function() {
    rel=$(this).attr('rel');
    $(".ul_menutabs a").removeClass('active');
    $(this).addClass('active');
    $('html, body').animate({
        scrollTop: $(rel).offset().top - 220
    });
});

$(window).scroll(function() {
  var scrollDistance = $(window).scrollTop() + 240;
  $('.fullsec').each(function(i) {
    if ($(this).position().top <= scrollDistance) {
                $('.ul_menutabs li a.active').removeClass('active');
                $('.ul_menutabs li a').eq(i).addClass('active');
    }
  });
}).scroll();


// new WOW().init();
// $('#lightgallery').lightGallery({
//     controls: true,
//     enableSwipe: false,
//     enableDrag: false,
// });

// $('#lbtgallery').lbtLightBox({

  
//   custom_children: ".item .img",

  
//   captions: true,
//   captions_selector: ".item .caption",
//   qtd_pagination: 6,
  
// });




$(".humberger").click(function(){
  $(this).toggleClass("active");
  $(this).next().toggleClass("active");
  $('body').toggleClass("active");
});

$(".side_bar .close").click(function(){
  $(this).toggleClass("active");
  $(this).parent().toggleClass("active")
});

$(".filter label").click(function(){
  rel=$(this).attr('rel');
  // $(".side_bar").removeClass("active")
  $('#'+ rel + "_filter").addClass('active'); 
  $('body').toggleClass("active");
});


$("#tabs-nav li").click(function(){
    activeTab = $(this).attr('rel');
    $("#tabs-nav li").removeClass("active");
    $(".tab-content").fadeOut(0);
    $(this).addClass("active");
    $("#" + activeTab).fadeIn();
    $('body').removeClass("active");


    $(".side_bar, .top_fixon").fadeOut(0);
    $("#" + activeTab + "_filter").fadeIn();
    $("#" + activeTab + "_filter").children().removeClass('active');
    $('html, body').animate({
        scrollTop: $('html, body').offset().top - 0
    },0);
});




// $('#tabs-nav li:first-child').addClass('active');
// $('.tab-content').hide();
// $('.tab-content:first').show();

// // Click function
// $('#tabs-nav li').click(function(){
//   $('#tabs-nav li').removeClass('active');
//   $(this).addClass('active');
//   $('.tab-content').hide();
  
// });

$(".slider .item" ). on( "click", function() {
    const rel = $(this).parent().parent().parent().parent().attr('rel');
    console.log(rel)
    $("#gallery_thumbslider").fadeOut();
    $('body').css({'overflow':'hidden'});
    $("#"+rel).fadeIn();
})

$("#gallery_thumbslider .closebtn" ). on( "click", function() {
    $("#gallery_thumbslider").fadeOut();
    $('body').css({'overflow':'auto'});
})

$("#gallery_thumbslider #thumbclose" ). on( "click", function() {
  $(this).parent().toggleClass('flip');
})



 


let companyupdatesslider = $('.companyupdatesslider');

companyupdatesslider.owlCarousel({
    loop:true,
    // animateOut: 'fadeOut',
    // animateIn: 'fadeIn',
    thumbs: false,
    autoplay:4000,
    margin:20,
    nav:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})

companyupdatesslider.owlCarousel();
$('.arrows .customNextBtn').click(function() {
    companyupdatesslider.trigger('next.owl.carousel');
})
$('.arrows .customPrevBtn').click(function() {
    companyupdatesslider.trigger('prev.owl.carousel', [300]);
})


let HomeSlider = $('.HomeSlider');

HomeSlider.owlCarousel({
    loop:true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    thumbs: false,
    autoplay:3000,
    margin:0,
    nav:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})


HomeSlider.owlCarousel();
$('.arrows .customNextBtn').click(function() {
    HomeSlider.trigger('next.owl.carousel');
})
$('.arrows .customPrevBtn').click(function() {
    HomeSlider.trigger('prev.owl.carousel', [300]);
})


let HomepeoplesaySlide = $('.HomepeoplesaySlide');

HomepeoplesaySlide.owlCarousel({
    loop:false,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    thumbs: false,
    autoplay:false,
    margin:0,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})


// $('.counter').counterUp({
//         delay: 50,
//         time: 4000
//     });



});


// document.querySelector("#lbt-thumbnails").addEventListener("click", e => {
//   const target = e.target.closest("li")
//   if (target) { // clicked on an <li>
//     const siblings = Array.from(target.parentElement.children)
//     const position = siblings.indexOf(target) + 1
//     alert(`your position is: ${position}`)
//   }
// })

$(document).ready(function() {
 
    var slider = $(".slider");
    var slider2 = $(".slider2");
    // var slider3 = $(".slider3");
   
    slider.owlCarousel({
        loop:false,
        margin:30,
        items:1,
        items:2,
        thumbs: false,
        dots:false,
        nav:true,
        URLhashListener:true,
        responsive:{
          0:{
              items:1,
              margin:10,
          },
          600:{
              items:1
          },
          1000:{
              items:2
          }
        }
      })
      slider2.owlCarousel({
        loop:false,
        margin:20,
        nav:true,
        thumbs: true,
        thumbImage: true,
        thumbsPrerendered: true,
        thumbContainerClass: 'owl-thumbs',
        thumbItemClass: 'owl-thumb-item',
        items:1,
        dots:false,
        center: false,
        URLhashListener:true,
        onInitialized  : counter, //When the plugin has initialized.
        onTranslated : counter //When the translation of the stage has finished.
      })

      slider2.on('changed.owl.carousel', function(event) {
        var item = event.item.index - 2;     // Position of the current item
        $('h1').removeClass('animated bounce');
   $('.owl-item').not('.cloned').eq(item).find('h1').addClass('animated bounce');
    });

    function counter(event) {
      var element   = event.target;         // DOM element, in this example .owl-carousel
       var items     = event.item.count;     // Number of items
       var item      = event.item.index + 1;     // Position of the current item
     
     // it loop is true then reset counter from 1
     if(item > items) {
       item = item - items
     }
     $('#counter').html(item+" / "+items)
   }
      // slider3.owlCarousel({
      //   loop:true,
      //   margin:10,
      //   nav:true,
      //   items:3,
      //   dots:false,
      //   center: false,
      //   URLhashListener:true
      // })


var $filterCheckboxes = $('#RESIDENTIAL_filter input[type="checkbox"]');
var filterFunc = function() {
  
  var selectedFilters = {};

  $filterCheckboxes.filter(':checked').each(function() {

    if (!selectedFilters.hasOwnProperty(this.name)) {
      selectedFilters[this.name] = [];
    }

    selectedFilters[this.name].push(this.value);
  });

  // create a collection containing all of the filterable elements
  var $filteredResults = $('.projectBlock');

  // loop over the selected filter name -> (array) values pairs
  $.each(selectedFilters, function(name, filterValues) {

    // filter each .projectBlock element
    $filteredResults = $filteredResults.filter(function() {

      var matched = false,
        currentFilterValues = $(this).data('category').split(' ');

      // loop over each category value in the current .projectBlock's data-category
      $.each(currentFilterValues, function(_, currentFilterValue) {

        // if the current category exists in the selected filters array
        // set matched to true, and stop looping. as we're ORing in each
        // set of filters, we only need to match once

        if ($.inArray(currentFilterValue, filterValues) != -1) {
          matched = true;
          return false;
        }
      });

      // if matched is true the current .projectBlock element is returned
      return matched;

    });
  });

  $('.projectBlock').hide().filter($filteredResults).show();
}

$filterCheckboxes.on('change', filterFunc);  


var $filterCheckboxesCommercial = $('#COMMERCIAL_filter input[type="checkbox"]');
var filterFuncCommercial = function() {
  
  var selectedFilters = {};

  $filterCheckboxesCommercial.filter(':checked').each(function() {

    if (!selectedFilters.hasOwnProperty(this.name)) {
      selectedFilters[this.name] = [];
    }

    selectedFilters[this.name].push(this.value);
  });

  // create a collection containing all of the filterable elements
  var $filteredResults = $('.projectBlockCommercial');

  // loop over the selected filter name -> (array) values pairs
  $.each(selectedFilters, function(name, filterValues) {

    // filter each .projectBlockCommercial element
    $filteredResults = $filteredResults.filter(function() {

      var matched = false,
        currentFilterValues = $(this).data('category').split(' ');

      // loop over each category value in the current .projectBlockCommercial's data-category
      $.each(currentFilterValues, function(_, currentFilterValue) {

        // if the current category exists in the selected filters array
        // set matched to true, and stop looping. as we're ORing in each
        // set of filters, we only need to match once

        if ($.inArray(currentFilterValue, filterValues) != -1) {
          matched = true;
          return false;
        }
      });

      // if matched is true the current .projectBlockCommercial element is returned
      return matched;

    });
  });

  $('.projectBlockCommercial').hide().filter($filteredResults).show();
}

$filterCheckboxesCommercial.on('change', filterFuncCommercial);  
      


   
  });



$(document).ready(function(){
    $("#contactForm").validate({
       submitHandler: submitFromcontact,
       // rules: {
       //   phone: {
       //     pattern: /^[\d\(\)\+]+$/m
       //   }
       // },
       // messages: {
       //   phone: {
       //     pattern: "Please enter a valid number."
       //   }
       // },
       ignore: []
    });
});

// function submitFromto(form) {
//     var objc = $('form#'+form.id);
//             $("#ContactForm .btnsubmit").fadeOut(0); 
//     var formDatac = $('form#'+form.id).serialize()+'&command='+form.id;
//     $.post("../../contactform.php",  formDatac , function(data) {
//         if(data.status=='success') {
//             // alert("Success");
//             $("#contact_msg_status").fadeIn(0); 
//         } else {
//             // alert("Failed");
//             objc.hide();
//             objc.parent().append(data.message);
//         }
//     }, "json");
//     return false;
// }

function submitFromcontact(form) {
    var obj = $('form#'+form.id);  
    $('html').addClass("bodyhide"); 
    var formData = $('form#'+form.id).serialize()+'&command='+form.id;
    $.post("contactform.php",  formData , function(data) {
        if(data.status=='success') {
            $("#contactForm input:submit").animate({'opacity': '0.5'});
            $("#contactForm input:submit").attr('disabled', 'disabled');
            $("#contactForm_msg_status p").fadeIn(0);
        } else {
            // alert("Failed");
            obj.hide();
            obj.parent().append(data.message);
        }
    }, "json");
    return false;
}

$(document).ready(function(){
    $("#contactFormget").validate({
       submitHandler: submitFromgetintouch,
       
       ignore: []
    });
});

function submitFromgetintouch(form) {
    var obj = $('form#'+form.id);  
    $('html').addClass("bodyhide"); 
    var formData = $('form#'+form.id).serialize()+'&command='+form.id;
    $.post("contactform.php",  formData , function(data) {
        if(data.status=='success') {
            $("#contactFormget input:submit").animate({'opacity': '0.5'});
            $("#contactFormget input:submit").attr('disabled', 'disabled');
            $("#contactFormget_msg_status p").fadeIn(0);
        } else {
            // alert("Failed");
            obj.hide();
            obj.parent().append(data.message);
        }
    }, "json");
    return false;
}




$(document).ready(function(){
    $("#contactFormJob").validate({
       submitHandler: submitFromjob,
       
       ignore: []
    });
});

function submitFromjob(form) {
    var obj = $('form#'+form.id);  
    $('html').addClass("bodyhide"); 
    var formData = $('form#'+form.id).serialize()+'&command='+form.id;
    $.post("contactformjob.php",  formData , function(data) {
        if(data.status=='success') {
            $("#contactFormJob input:submit").animate({'opacity': '0.5'});
            $("#contactFormJob input:submit").attr('disabled', 'disabled');
            $("#contactFormJob_msg_status p").fadeIn(0);
        } else {
            // alert("Failed");
            obj.hide();
            obj.parent().append(data.message);
        }
    }, "json");
    return false;
}






  


  