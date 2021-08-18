let $cards = [];

let $dateRecordTest = $('.date-record-header');
let $dateRecords = $('.accordion')

$(document).on('click', '.date-record-header', function () {
    console.log('open date records');
    $(this).siblings('.accordion').toggle('display');
    // $(console.log(EventTarget.siblings()));
    $dateRecords.eq(0).toggle('display');
});

//$cards Structure
// let cards = [
//     {
//         date: '##-##-####',
//         meals: [
//              {
//                  mealName: breakfast,
//                  mealDetails: {
//                          mealFood: ___,
//                          mealCalories: ___
//                  }
//                  
//              }
//              {
//                  mealName: lunch,
//                  mealDetails: {
//                          mealFood: ___,
//                          mealCalories: ___
//                  }
//                  
//              }
//          ]
//     }
// ]

const addMeal = () => {
    console.log('addmeal');
    $('#addMealForm').css({ display: "flex" })
}

$('#addMealButton').click(addMeal);


$('#addMealForm').on('submit', function (event) {
    event.preventDefault();
    console.log('1nic');
    let $newMeal = $('#selectMealType').val();
    let $newMealDate = $('#newMealDate').val();
    let $newMealFood = $('#newMealFood').val();
    let $newMealCalories = $('#newMealCalories').val();

    let newMeal = {
        mealName: `${$newMeal}`,
        mealDetails: {
            food: `${$newMealFood}`,
            calories: `${$newMealCalories}`
        }
    }

    console.log('newMeal is');
    console.log(newMeal);

    if ($cards.length === 0) {
        console.log("Z.");
        createDateCard($newMealDate, newMeal);
        addMealCard(newMeal, 0);
        console.log("Z. Cards is:");
        console.log($cards);
    }
    else {
        let needToAddCard = true;

        for (let i = 0; i < $cards.length; i++) {

            if ($cards[i].date == $newMealDate) {
                console.log("A.");
                console.log('i is ' + i);
                console.log('$cards.length is ' + $cards.length);
                $cards[i].meals.push(newMeal);
                console.log("A. Cards is:");
                console.log($cards);
                addMealCard(newMeal, i);
                needToAddCard = false;
                break;
                console.log('passed the break');
            }
        }
        if (needToAddCard) {
            console.log("B.");
            console.log('$cards.length is ' + $cards.length);
            createDateCard($newMealDate, newMeal);
            addMealCard(newMeal, $cards.length - 1);
            console.log("B. Cards is:");
            console.log($cards);
        }
    }

    //clear form
    $('#newMealDate').val("");
    $('#newMealFood').val("");

    //hide form
    $('#addMealForm').css({ display: "none" })

    console.log('😄 almost done and $cards is:');
    console.log($cards);
});

const createDateCard = ($newMealDate, newMeal) => {
    let card = {
        date: `${$newMealDate}`,
        meals: []
    }

    console.log('NIC CARD IS:');
    console.log(card.meals.length);
    console.log(card);
    console.log(card.meals);
    console.log(card.meals[0]);
    card.meals.push(newMeal);
    console.log(card.meals.length);
    console.log(card);
    console.log(card.meals);
    console.log(card.meals[0]);
    $cards.push(card);

    console.log('NIC CARDS IS:');
    console.log(card.meals.length);

    console.log($cards);

    let newDateCard =
        `<div class="date-record">
            <div class="date-record-header bg-info">
                <h1>${$newMealDate}</h1>
                <div class="daily-summary">
                    <div class="daily-summary-data">Total Calories: ###</div>
                    <div class="daily-summary-data">Total Fat: ###</div>
                    <div class="daily-summary-data">Total Carbs: ###</div>
                    <div class="daily-summary-data">Total Protein: ###</div>
                </div>
            </div>
            <div class="accordion accordion-flush"></div>
        </div>`;

    $('#cards').append(newDateCard);
}

const addMealCard = (newMeal, cardNumber) => {
    let mealCard =
        `<div class="accordion-item">
            <h2 class="accordion-header" id="flush-heading${cardNumber}${newMeal.mealName}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#flush-collapse${cardNumber}${newMeal.mealName}" aria-expanded="false" aria-controls="flush-collapse${cardNumber}${newMeal.mealName}">
                    ${newMeal.mealName}
                </button>
            </h2>
            <div id="flush-collapse${cardNumber}${newMeal.mealName}" class="accordion-collapse collapse" aria-labelledby="flush-heading${cardNumber}${newMeal.mealName}"
                data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">Food: ${newMeal.mealDetails.food}, Calories: ${newMeal.mealDetails.calories}</div>
            </div>
        </div>`;
    let $dateCards = $('.accordion');
    $dateCards.eq(cardNumber).append(mealCard);
}