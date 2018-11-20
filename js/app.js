
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

    //Resets value in select input
    $color.val("")

    //Displays options for "JS puns"
    if ($design.val() === "js puns") {
        $shirt_color.show();
        
        $color_options.each((index, element) => {

            $(element).hide();

            if (index <= 2) {
                $(element).show();
            } 

        })

    //Displays options for"I JS"
    } else if ($design.val() === "heart js") {
        $shirt_color.show();

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

$activities.on("click", (event) => {

    if (event.target === $activities[1] || event.target === $activities[3]) {
        overlaped(1,3);
        overlaped(3,1);
    } else if (event.target === $activities[2] || event.target === $activities[4]) {
        overlaped(2,4);
        overlaped(4,2);
    }

    //Adding total amount to pay

    let toPay_counter = 0;

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