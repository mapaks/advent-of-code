const input = document.querySelector('input[type="file"]');
const output = document.querySelector('#output');

input.addEventListener('change', function() {
  
  const file = this.files[0];

  const reader = new FileReader();

  reader.onload = function() {
    const text = reader.result;

    const mostCalories = getMostCalories(text)

    output.value = mostCalories
  };

  reader.readAsText(file);
});

const getMostCalories = (calorieList) => {
  const calories = calorieList.split('\n')
  let mostCalories = 0
  let individualCalorie = 0;
  
  calories.forEach(calorie => {
    if (calorie == '') {  
      if (individualCalorie > mostCalories) {
        mostCalories = individualCalorie
      }

      individualCalorie = 0
    } else {
        individualCalorie += parseInt(calorie)
    }
  });

  return mostCalories;
}