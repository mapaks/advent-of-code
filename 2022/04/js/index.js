const input = document.querySelector('input[type="file"]')

input.addEventListener('change', function() {
  
  const file = this.files[0];

  const reader = new FileReader()

  reader.onload = function() {
    const text = reader.result

    // Add code here
    const output = document.querySelector('.output');
    output.innerHTML = `Total Overlap: ${countOverlap(text)}`
  };

  reader.readAsText(file)
})

const countOverlap = (puzzleInput) => {
  const bigList = puzzleInput.split('\n')
  let count = 0

  bigList.forEach(item => {
    const sections = item.split(',')

    if (sections[0] != '') {
      let sectionOne = []
      let sectionTwo = []

      let start = 0
      let end = 0

      for (let index = 0; index < sections.length; index++) {
        if (index == 0) {
          const firstAssignments = sections[index].split('-');

          for (let indexAsgmt = 0; indexAsgmt < firstAssignments.length; indexAsgmt++) {
            const section = firstAssignments[indexAsgmt];
            
            if (indexAsgmt == 0) {
              start = parseInt(section)
            } else {
              end = parseInt(section)
            }
          }

          for (let indexSection = start; indexSection <= end; indexSection++) {
            sectionOne.push(indexSection)
          }
        } else {
          const secondAssignments = sections[index].split('-');

          for (let indexAsgmt = 0; indexAsgmt < secondAssignments.length; indexAsgmt++) {
            const section = secondAssignments[indexAsgmt];
            
            if (indexAsgmt == 0) {
              start = parseInt(section)
            } else {
              end = parseInt(section)
            }
          }

          for (let indexSection = start; indexSection <= end; indexSection++) {
            sectionTwo.push(indexSection)
          }
        }
      }

      if ((sectionOne[0] <= sectionTwo[0] && sectionOne[sectionOne.length-1] >= sectionTwo[sectionTwo.length-1]) ||  (sectionTwo[0] <= sectionOne[0] && sectionTwo[sectionTwo.length-1] >= sectionOne[sectionOne.length-1])) {
        count++
      }
    }
  });

  return count
}
