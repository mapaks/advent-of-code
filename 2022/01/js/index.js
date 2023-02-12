const input = document.querySelector('input[type="file"]');

input.addEventListener('change', function() {
  
  const file = this.files[0];

  const reader = new FileReader();

  reader.onload = function() {
    const text = reader.result;

    // Part One
    const output = document.querySelector('#output');
    const mostCalories = getMostCalories(text)
    output.value = mostCalories

    // Part Two
    const partTwo = document.querySelector('#part-two');
    partTwo.value = getTotalCaloriesOfTopThreeElves(getCaloriesPerElf(text))
  };

  reader.readAsText(file);
});

// Get most calories from the list of calories
const getMostCalories = (calorieList) => {
  const calories = calorieList.split('\n')
  let mostCalories = 0
  let individualCalorie = 0
  
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

// Get an array of total calories per elf
const getCaloriesPerElf = (calorieList) => {
  const calories = calorieList.split('\n')

  let totalCaloriePerElf = []
  let caloriePerElf = 0

  calories.forEach(calorie => {
    if (calorie != '') {  
      caloriePerElf += parseInt(calorie)
    } else {
      totalCaloriePerElf.push(caloriePerElf)
      caloriePerElf = 0
    }
  });

  return totalCaloriePerElf
}

// Get top three elves carrying the most Calories
const getTotalCaloriesOfTopThreeElves = (elfCaloriesList) => {
  let totalCalories = 0;

  elfCaloriesList.sort((a,b) => b-a)
  
  for (let index = 0; index < 3; index++) {
    totalCalories += elfCaloriesList[index]
  }

  return totalCalories
}