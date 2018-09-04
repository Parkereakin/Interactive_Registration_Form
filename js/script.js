/*
	Techdegree Project: Unit 3 - Interactive Form for Registration
*/

// Global Variables
	let jobRole = $('#title').val();
	let activities = $('.activities input');
	let numChecked = $('.activities :checked').length;
	let ccNum = $('#cc-num').val();
	let checkCCNum = checkIntegers(ccNum);
	let zipNum = $('#zip').val();
	let checkZipNum = checkIntegers(zipNum);
	let cvvNum = $('#cvv').val();
	let checkCvvNum = checkIntegers(cvvNum);

// Automatically focus on first field after page load
	$('#name').focus();

// Changes "Other" Label text, and hides the label and input until the "other" option under Job Role is selected.
	$('#other').hide();
	$('#other').prev().text('Other - Job Role:');
	$('#other').prev().hide();
	$('#title').on('change', function() {
		jobRole = $('#title').val();
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
		let designChosen = $('#design').val().toLowerCase();
		let colorOptions = $('#color option').length;
		if (designChosen !== 'select theme') {
			$('#colors-js-puns').show();
		} else {
			$('#colors-js-puns').hide();
		}

		function hideColors(color) {
			$('#color option').each(function(i) {
				let colorText = $(this).text();
				let colorStart = colorText.toLowerCase().indexOf('(');
				colorStart += 1;
				let colorEnd = colorText.toLowerCase().indexOf(')');
				let colorLength = colorEnd - colorStart;
				let colorTheme = colorText.substr(colorStart, colorLength).replace(" shirt only", "");

				if (colorTheme !== color) {
					$(this).hide();
				} else {
					$(this).show();
				}
			});
		}
		if ( designChosen === 'js puns') {
			hideColors('JS Puns');
			$('#color').val('cornflowerblue');
		} else if (designChosen === 'heart js') {
			hideColors('I ♥ JS');
			$('#color').val('tomato');
		}
	});

// Make sure User can't select two activites occuring at the same time.
	// Splits the strings to get time. Creates an array, then adds and removes times of clicked or uncliked inputs. If input is clicked, and the time already exists in the array, an alert pops up and the input is unchecked.
	var timeArray = [];
	var dayArray = [];
	var priceArray = [0];
	var displayPrice = document.createElement('p');
	displayPrice.className = "priceTotal";
	document.querySelector('.activities').append(displayPrice);
	const allActivities = document.querySelectorAll('.activities input');
	var activitiesArray = [];

	for (let i = 0; i < allActivities.length; i++) {
		let text = $(allActivities[i]).parent().text();
		allActivities[i].className = `${i}`
		let title = text.substr(0, text.indexOf(' —'));
		let timeStart = text.toLowerCase().indexOf('m-') - 2;
		let timeEnd = text.toLowerCase().indexOf(', $');
		let timeLength = timeEnd - timeStart;
		let time = text.substr(timeStart, timeLength);
		if (time.indexOf('m') !== -1) {
			time = time
		} else {
			time = ""
		};
		let textLessTitle = text.replace(`${title} — `, "");
		let day = textLessTitle.substr(0, textLessTitle.indexOf(' '));
		let arrayIndex = jQuery.inArray(time, timeArray);
		let priceStart = text.toLowerCase().indexOf('$') + 1;
		let priceEnd = text.length;
		let price = parseInt(text.substr(priceStart, priceEnd));

		activitiesArray.push({
			'fullText': text,
			'index': i,
			'checked': false,
			'title': title,
			'day': day,
			'time': time,
			'price': price
		});
	}

	$(activities).on('change', function() {
		let thisText = $(this).parent().text();
		let number = activitiesArray
						.filter((activity) => activity.fullText === thisText)
						.map((num) => parseInt(num.index));
		let num = number[0];
		let thisDay = activitiesArray[num].day;
		let thisTime = activitiesArray[num].time;

		let dayArrayIndex = jQuery.inArray(thisDay, dayArray);
		let timeArrayIndex = jQuery.inArray(thisTime, timeArray);
		if ($(this).is(':checked')) {
			for (let i = 0; i < activitiesArray.length; i++) {
				if (activitiesArray[i].day === thisDay && activitiesArray[i].time === thisTime && activitiesArray[i].index !== num) {
					allActivities[i].parentNode.style.opacity = "0.2";					
					allActivities[i].disabled = true;					
					allActivities[i].parentNode.style.textDecoration = "line-through";					
				}
			}
		}
		else {
			for (let i = 0; i < activitiesArray.length; i++) {
				if (activitiesArray[i].day === thisDay && activitiesArray[i].time === thisTime && activitiesArray[i].index !== num) {
					allActivities[i].parentNode.style.opacity = "1";						
					allActivities[i].disabled = false;								
					allActivities[i].parentNode.style.textDecoration = "none";					
				}
			}
		}

		// Calculate and display total cost of the selected activities, below the list of activities
		let price = activitiesArray[num].price;
		if ($(this).is(':checked')) {
			activitiesArray[num].checked = true;
		}
		else {
			activitiesArray[num].checked = false;
		}

		let totalPrice = activitiesArray
							.filter(activity => activity.checked === true)
							.reduce((sum, activityPrice) => sum += activityPrice.price , 0);
		displayPrice.textContent = "Your Total: $" + totalPrice;
	});

// Select credit Card as the payment option by default
	const paymentMethod = $('#payment');
	paymentMethod.val("credit card");

// When a user chooses a payment option, the chosen payment section is revealed and the other payment sections are hidden	
	const creditCard = $('#credit-card');
	const payPal = $('#credit-card').next("div");
	const bitcoin = $('#credit-card').next("div").next("div");
	creditCard.show();
	payPal.hide();
	bitcoin.hide();

	$(paymentMethod).on('change', function() {
		let paymentOption = $(this).val();
		if (paymentOption === "credit card") {
			creditCard.show();
			payPal.hide();
			bitcoin.hide();
		} else if (paymentOption === "paypal") {
			creditCard.hide();
			payPal.show();
			bitcoin.hide();
		} else if (paymentOption === "bitcoin") {
			creditCard.hide();
			payPal.hide();
			bitcoin.show();
		}
	});

//Form cannot be submitted (the page does not refresh when the submit button is clicked) until the following requirements have been met:
	function checkIntegers(num) {
		let isNan = Number.isNaN(num);
		return isNan;
	}

	$('button').on('click', function(e) {
		let name = $('#name').val();
		let email = $('#mail').val();
		let other = $('#other').val();
		let dotCom = email.indexOf('.');
		numChecked = $('.activities :checked').length;
		let paymentOption = paymentMethod.val();
		if (name === "") {
			e.preventDefault();
			alert('You forgot to enter your name!');
			$('#name').focus();
			$('input#name:focus').css('border-color', 'red');
			$('#name').prev().css('color', 'red');
		} else if (dotCom === -1 ) {
			e.preventDefault();
			alert('Your email address in incomplete.');
			$('#mail').focus();
			$('input#mail:focus').css('border-color', 'red');
			$('#mail').prev().css('color', 'red');
		} else if (jobRole === 'other' && other === "") {
			e.preventDefault();
			alert('You forgot to enter your Job Role!');
			$('#other').focus();
			$('input#other:focus').css('border-color', 'red');
			$('#other').prev().css('color', 'red');
		} else if (numChecked === 0 ) {
			e.preventDefault();
			alert('You must select an activity');
			$('.activities').css('background-color', 'rgba(255, 0, 0, 0.3)');
			$([document.documentElement, document.body]).animate({
		        scrollTop: $(".activities").offset().top
		    }, 600);
		} else if (paymentOption === "credit card") {
			ccNum = $('#cc-num').val();
			checkCCNum = isNaN(ccNum);
			zipNum = $('#zip').val();
			checkZipNum = isNaN(zipNum);
			cvvNum = $('#cvv').val();
			checkCvvNum = isNaN(cvvNum);
			if (checkCCNum === true || ccNum.length < 13 || ccNum.length > 16) {
				e.preventDefault();
				alert('The Credit Card number is invalid.');
				$('#cc-num').focus();
				$('input#cc-num:focus').css('border-color', 'red');
				$('#cc-num').prev().css('color', 'red');
			} else if (checkZipNum === true || zipNum.length !== 5) {
				e.preventDefault();
				alert('The Zip Code must be 5 digits.');
				$('#zip').focus();
				$('input#zip:focus').css('border-color', 'red');
				$('#zip').prev().css('color', 'red');
			} else if (checkCvvNum === true || cvvNum.length !== 3) {
				e.preventDefault();
				alert('The CVV value must be 3 numbers.');
				$('#cvv').focus();
				$('input#cvv:focus').css('border-color', 'red');
				$('#cvv').prev().css('color', 'red');
			}
		}
	});

	// Name field isn’t blank.
	$('#name').on('change', function(e) {
		let name = $('#name').val();
		if (name !== "") {
			$('input#name').css('border-color', 'transparent');
			$('input#name:focus').css('border-color', '#5e97b0');
			$('#name').prev().css('color', '#000');
		}
	});

	// Email field contains validly formatted e-mail address: (doesn’t have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com, for example).
	$('#mail').on('change', function(e) {
		let email = $('#mail').val();
		if (email !== "") {
			$('input#mail').css('border-color', 'transparent');
			$('input#mail:focus').css('border-color', '#5e97b0');
			$('#mail').prev().css('color', '#000');
		}
	});

	// Name field isn’t blank.
	$('#other').on('change', function(e) {
		let other = $('#other').val();
		if (other !== "") {
			$('input#other').css('border-color', 'transparent');
			$('input#other:focus').css('border-color', '#5e97b0');
			$('#other').prev().css('color', '#000');
		}
	});

	// At least one checkbox under "Register for Activities" section must be selected.
	$(activities).on('change', function(e) {
		numChecked = $('.activities :checked').length;
		if (numChecked !== 0) {
			$('.activities').css('background-color', 'transparent');
		}
	});

	// If "Credit Card" is the selected payment option, the three fields accept only numbers: a 13 to 16-digit credit card number, a 5-digit zip code, and 3-number CVV value.
	$('#cc-num').on('change', function(e) {
		ccNum = $('#cc-num').val();
		checkCCNum = isNaN(ccNum);
		if (checkCCNum === false  && ccNum.length >= 13 && ccNum.length <= 16) {
			$('input#cc-num').css('border-color', 'transparent');
			$('input#cc-num:focus').css('border-color', '#5e97b0');
			$('#cc-num').prev().css('color', '#000');
		}
	});

	$('#zip').on('change', function(e) {
		zipNum = $('#zip').val();
		checkZipNum = isNaN(zipNum);
		if (checkZipNum === false && zipNum.length === 5) {
			$('input#zip').css('border-color', 'transparent');
			$('input#zip:focus').css('border-color', '#5e97b0');
			$('#zip').prev().css('color', '#000');
		}
	});

	$('#cvv').on('change', function(e) {
		cvvNum = $('#cvv').val();
		checkCvvNum = isNaN(cvvNum);
		if (checkCvvNum === false && cvvNum.length === 3) {
			$('input#cvv').css('border-color', 'transparent');
			$('input#cvv:focus').css('border-color', '#5e97b0');
			$('#cvv').prev().css('color', '#000');
		}
	});




// On submission, the form provides an error indication or message for each field that requires validation:

	// Name field

	// Email field

	// “Register for Activities” checkboxes

	// Credit Card number, Zip code, and CVV, only if the credit card payment method is selected.





//////////   tips:

//    Could make it a little more obvious what activities are conflicting with the one you 
//    have picked (if any), disabling the checkbox of the conflicting activity would be a good start.








