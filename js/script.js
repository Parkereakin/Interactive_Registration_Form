/*
	Techdegree Project: Unit 3 - Interactive Form for Registration
*/


// Automatically focus on first field after page load
	$('#name').focus();

// Changes "Other" Label text, and hides the label and input until the "other" option under Job Role is selected.
	$('#other').hide();
	$('#other').prev().text('Other - Job Role:');
	$('#other').prev().hide();

	$('#title').on('change', function() {

		var jobRole = $('#title').val();

		if (jobRole === 'other') {
			$('#other').show();
			$('#other').prev().show();
		} else {
			$('#other').hide();
			$('#other').prev().hide();
		}

	});

// Color drop down menu is hidden until a T-shirt design is selected.
	$('#colors-js-puns').hide();

	$('#design').on('change', function() {

		var designChosen = $('#design').val().toLowerCase();

		if (designChosen !== 'select theme') {
			$('#colors-js-puns').show();
		} else {
			$('#colors-js-puns').hide();
		}

	});

// Make sure User can't select two activites occuring at the same time.
	// Splits the strings to get time. Creates an array, then adds and removes times of clicked or uncliked inputs. If input is clicked, and the time already exists in the array, an alert pops up and the input is unchecked.
	var activities = $('.activities input');
	var timeArray = [];
	var priceArray = [0];

	var displayPrice = document.createElement('p');
	displayPrice.className = "priceTotal";
	document.querySelector('.activities').append(displayPrice);


	$(activities).on('change', function() {
		var text = $(this).parent().text();
		var timeStart = text.toLowerCase().indexOf('m-');
		timeStart += -2;
		var timeEnd = text.toLowerCase().indexOf(', $');
		var timeLength = timeEnd - timeStart;
		var time = text.substr(timeStart, timeLength);
		var arrayIndex = jQuery.inArray(time, timeArray);

		if ($(this).is(':checked')) {
			if (arrayIndex !== -1) {
				alert("uh oh! You can't be in 2 places at once.");
				$(this).prop('checked', false);
			} else {
			 timeArray.push(time);
			}
		}
		else {
			timeArray.splice(arrayIndex, 1);
		}


		// Calculate and display total cost of the selected activities, below the list of activities
		var priceStart = text.toLowerCase().indexOf('$');
		priceStart += 1;
		var priceEnd = text.length;
		var price = text.substr(priceStart, priceEnd);
		var priceArrayIndex = jQuery.inArray(price, priceArray);

		if ($(this).is(':checked')) {
			if (arrayIndex !== -1) {

			} else {
				priceArray.push(parseInt(price));
			}
		}
		else {
			priceArray.push(parseInt(price * -1));
		}

		function getSum(total, num) {
		    return total + num;
		}

		var totalPrice = priceArray.reduce(getSum);
		console.log(totalPrice);

		displayPrice.textContent = "Your Total: $" + totalPrice;


	});


// Select credit Card as the payment option by default
	var paymentMethod = document.querySelector('#payment');
	paymentMethod.value = "credit card";

// Payment option in the select menu matches the payment option displayed on the page


// When a user chooses a payment option, the chosen payment section is revealed and the other payment sections are hidden



//Form cannot be submitted (the page does not refresh when the submit button is clicked) until the following requirements have been met:

	// Name field isn’t blank.

	// Email field contains validly formatted e-mail address: (doesn’t have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com, for example).

	// At least one checkbox under "Register for Activities" section must be selected.

	// If "Credit Card" is the selected payment option, the three fields accept only numbers: a 13 to 16-digit credit card number, a 5-digit zip code, and 3-number CVV value.



// On submission, the form provides an error indication or message for each field that requires validation:

	// Name field

	// Email field

	// “Register for Activities” checkboxes

	// Credit Card number, Zip code, and CVV, only if the credit card payment method is selected.

	// Form provides at least one error message in real time, before the form is submitted. For example, the error message appears near the email field when the user begins to type, and disappears as soon as the user has entered a complete and correctly formatted email address.

	// Form provides at least one error message that changes depending on the error. For example, the email field displays a different error message when the email field is empty than it does when the email address is formatted incorrectly. *This is accomplished without the use of HTML5's built-in field validation.



// DONE - When JavaScript is disabled, all form fields and payment information is displayed, including the "Other" field under the "Job Role" section.









