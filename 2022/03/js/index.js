const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

const input = document.querySelector('input[type="file"]')

input.addEventListener('change', function() {
  
  const file = this.files[0];

  const reader = new FileReader()

  reader.onload = function() {
    const text = reader.result;

    const output = document.querySelector('.output');
    output.innerHTML = `Sum: ${getSum(text)}`

    const outputTwo = document.querySelector('.output-two');
    outputTwo.innerHTML = `Sum Per Three Lines: ${getSumPerThreeLines(text)}`
  };

  reader.readAsText(file)
})

const getSumPerThreeLines = (puzzleInput) => {
    const rucksacks = puzzleInput.split('\n')
    
    let allBadge = []
    
    for (let index = 0; index < rucksacks.length - 1; index += 3) {
        let groupOne = rucksacks[index]
        let groupTwo = rucksacks[index + 1]
        let groupThree = rucksacks[index + 2]

        let badgeInThreeGroups = []

        for (let groupOneBadge of groupOne) {

            if (groupTwo.includes(groupOneBadge) && groupThree.includes(groupOneBadge)) {
                if (!badgeInThreeGroups.includes(groupOneBadge)) {
                    badgeInThreeGroups.push(groupOneBadge)
                }
            }
        }

        allBadge = allBadge.concat(badgeInThreeGroups)
    }

    let sum = 0
    let allBadgeValue = []

    allBadge.forEach(badge => {
        allBadgeValue.push(parseInt(letters.indexOf(badge)) + 1)
        sum += parseInt(letters.indexOf(badge)) + 1
    })

    const sumArray = allBadgeValue.reduce((partialSum, a) => partialSum + a, 0)

    return sum
}

const getSum = (puzzleInput) => {
    const rucksacks = puzzleInput.split('\n')

    let allItemType = []
    let allItemTypeValue = []

    rucksacks.forEach(rucksack => {
        let sizePerCompartment = rucksack.trim().length / 2
        
        let compartmentOne = rucksack.substr(0, sizePerCompartment)
        let compartmentTwo = rucksack.substr(sizePerCompartment)
        
        let itemTypesInBothCompartments = []

        for (let itemTypeInCompartmentOne of compartmentOne) {

            if (!itemTypesInBothCompartments.includes(itemTypeInCompartmentOne)) {
                for (let itemTypeInSecondCompartment of compartmentTwo) {
                    if (itemTypeInCompartmentOne === itemTypeInSecondCompartment) {
                        if (!itemTypesInBothCompartments.includes(itemTypeInSecondCompartment)) {
                            itemTypesInBothCompartments.push(itemTypeInSecondCompartment)
                        }
                    }
                }
            }
        }

        allItemType = allItemType.concat(itemTypesInBothCompartments)
    })

    let sum = 0
    
    allItemType.forEach(itemType => {
        allItemTypeValue.push(parseInt(letters.indexOf(itemType)) + 1)
        sum += parseInt(letters.indexOf(itemType)) + 1
    })

    const sumArray = allItemTypeValue.reduce((partialSum, a) => partialSum + a, 0)

    return sum
}