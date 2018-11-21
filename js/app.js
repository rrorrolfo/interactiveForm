
// Focus name input when page is loaded
const $name = $("#name");

$(document).ready(function() {
    $name.focus();
})

//Hides extra input for job role 
const $job_role = $("#other-title");

$job_role.hide();


/////////// T-SHIRT INFO////////////////7

// hides color select menu untill a design is chosen

const $design = $("#design");
const $shirt_color = $("#colors-js-puns");
const $color = $("#color");
const $color_options = $("#color option");

$shirt_color.hide();

// Event listener for displaying color options after user selects the design on the T-shirt

$design.on("change", () => {

    //Displays options for "JS puns"
    if ($design.val() === "js puns") {
        $shirt_color.show();
        $color_options[0].selected = true;
        
        $color_options.each((index, element) => {

            $(element).hide();

            if (index <= 2) {
                $(element).show();
            } 

        })

    //Displays options for"I JS"
    } else if ($design.val() === "heart js") {
        $shirt_color.show();
        $color_options[3].selected = true;

        $color_options.each((index, element) => {

            $(element).hide();

            if (index >= 3) {
                $(element).show();
            } 

        })

        //hides color select input if neither of two options is selected
    } else {
        $shirt_color.hide();
    }
});

///////////// ACTIVITIES  /////////////////////

// Function that disables overlaped workshops
const overlaped = (a,b) => {

    // If wokshop a is selected then b is disabled 
    if ($activities[a].checked) {
        $activities[b].disabled = true;
    } else {
        $activities[b].disabled = false;
    }
}

// Event listener for disabling workshops if they overlap

const $activities_section = $(".activities");
const $activities = $(".activities input");
let toPay_counter = 0;

$activities.on("click", (event) => {

    if (event.target === $activities[1] || event.target === $activities[3]) {
        overlaped(1,3);
        overlaped(3,1);
    } else if (event.target === $activities[2] || event.target === $activities[4]) {
        overlaped(2,4);
        overlaped(4,2);
    }

    //Adding total amount to pay

    toPay_counter = 0;

    $.each($activities, (index, element) => {

        if(element.checked) {
            toPay_counter += 100;
        }; 

    })

    if ($activities[0].checked) {
        toPay_counter += 100;
    }
    
    if($(".activities p")) {
        $(".activities p").remove();
    }

    if(toPay_counter !== 0) {
        $activities_section.append(`<p>Total: ${toPay_counter}</p>`);
    }
    
    
})


///////////// PAYMENT METHOD  /////////////////////

const $payment = $("#payment");
const $payment_options = $("#payment option");
const $card_details = $("#credit-card");

// Disabling first option
$payment_options[0].disabled = true;
// Stating Credit card as the initial value
$payment_options[1].selected = true;
// Hide Paypal and bitcoin payment details
$card_details.siblings("div").addClass("is-hidden");

// Event listener for when a payment method is chosen

$payment.on("change", () => {
    
    if ($payment_options[2].selected) {
        // Display Paypal process and hide others
        $card_details.addClass("is-hidden");
        $card_details.next().removeClass("is-hidden");
        $card_details.next().next().addClass("is-hidden");

    } else if ($payment_options[3].selected) {
        // Display Bitcoin process and hide others
        $card_details.addClass("is-hidden");
        $card_details.next().addClass("is-hidden");
        $card_details.next().next().removeClass("is-hidden");

    } else {
        // Display CreditCard process and hide others
        $card_details.removeClass("is-hidden");
        $card_details.siblings("div").addClass("is-hidden");
    }

})

////////////// Form validations //////////7

const $submit_button = $("button[type='submit']");

// Email validation
const $email = $("#mail");
const email_regex = email => /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);

//Credit card validation
const $card_num = $("#cc-num");
const card_regex = card => /^\d{13,16}$/gm.test(card);

//Zip validation
const $zip = $("#zip");
const zip_regex = zip => /^\d{5}$/gm.test(zip);

//CVV validation
const $cvv = $("#cvv");
const cvv_regex = cvv => /^\d{3}$/gm.test(cvv);

// Event listener for "Submit" action that will trigger validation of name, email, at least 1 wokshop selected, and credit card numbers validation (if this method was selected as payment method)

$submit_button.on("click", event => {

    //Checks for an empty name field
    if($name.val() === "") {
        event.preventDefault();
    }

    //checks for a valid email address
    if(email_regex($email.val()) === false) {
        event.preventDefault();
    }

    //checks that at least 1 workshop has been selected
    if (toPay_counter === 0) {
        event.preventDefault();
    }

    //Check for credit card details validation if chosen as payment method

    if($payment_options[1].selected) {

        //checks that card number is strictly a 13 - 16 length number

        if (card_regex($card_num.val()) === false) {
            console.log($card_num.val())
            event.preventDefault();
        }

        //checks that zip code is strictly a 5 length number
        if (zip_regex($zip.val()) === false) {
            event.preventDefault();
        }

        //checks that cvv is strictly a 3 length number
        if (cvv_regex($cvv.val()) === false) {
            event.preventDefault();
        } 
    }
});
        

