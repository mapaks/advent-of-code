const input = document.querySelector('input[type="file"]');

input.addEventListener('change', function() {
  
  const file = this.files[0];

  const reader = new FileReader();

  reader.onload = function() {
    const text = reader.result;

    const output = document.querySelector('#output');
    let totalScore = getTotalScore(text).reduce((partialSum, a) => partialSum + a, 0);
    output.value = totalScore

    const strategy = document.querySelector('#strategy');
    totalScore = getTotalScoreByStrategy(text).reduce((partialSum, a) => partialSum + a, 0);
    strategy.value = totalScore
  };

  reader.readAsText(file);
});

const getTotalScoreByStrategy = (puzzleInput) => {
    const rounds = puzzleInput.split('\n')

    let player
    let myShapeScore
    let myOutcomeScore
    let myScorePerRound = []

    rounds.forEach(round => {
        myShapeScore = 0
        myOutcomeScore = 0
        player = round.split(' ');

        if (player[1] == 'X') { // lose
            myOutcomeScore = 0

            if (player[0] == 'A') { // rock > scissor
                myShapeScore = 3
            } else if (player[0] == 'B') { // paper > rock
                myShapeScore = 1
            } else if (player[0] == 'C') { // scissor > paper
                myShapeScore = 2
            }
        } else if (player[1] == 'Y') { // draw
            myOutcomeScore = 3

            if (player[0] == 'A') {
                myShapeScore = 1
            } else if (player[0] == 'B') {
                myShapeScore = 2
            } else if (player[0] == 'C') {
                myShapeScore = 3
            }
        } else if (player[1] == 'Z') { // win
            myOutcomeScore = 6

            if (player[0] == 'A') { // rock < paper
                myShapeScore = 2
            } else if (player[0] == 'B') { // paper < scissor
                myShapeScore = 3
            } else if (player[0] == 'C') { // scissor < rock
                myShapeScore = 1
            }
        }

        myScorePerRound.push(myShapeScore + myOutcomeScore)
    })
    console.log(myScorePerRound)
    return myScorePerRound
    
}

const getTotalScore = (puzzleInput) => {
  const rounds = puzzleInput.split('\n')
  let updatedRounds = []

  let player
  let myShapeScore
  let myOutcomeScore
  let myScorePerRound = []

  // Convert my shape XYZ to equivalent ABC
  rounds.forEach(round => {
    player = round.split(' ')

    if (player[1] == 'X') {
      updatedRounds.push(`${player[0]} ${'A'}`)
    } else if (player[1] == 'Y') {
      updatedRounds.push(`${player[0]} ${'B'}`)
    } else if (player[1] == 'Z') {
      updatedRounds.push(`${player[0]} ${'C'}`)
    }
  })

  updatedRounds.forEach(round => {
    myShapeScore = 0
    myOutcomeScore = 0
    player = round.split(' ')

    // get shape score
    if (player[1] == 'A') {
      myShapeScore = 1
    } else if (player[1] == 'B') {
      myShapeScore = 2
    } else if (player[1] == 'C') {
      myShapeScore = 3
    }

    // get outcome score
    if (player[0] == player[1]) {  // draw
      myOutcomeScore = 3  
    } else if ((player[0] == 'A' && player[1] == 'C') ||
      (player[0] == 'B' && player[1] == 'A') ||
      (player[0] == 'C' && player[1] == 'B')) {  // opponent wins
      myOutcomeScore = 0
    } else if ((player[1] == 'A' && player[0] == 'C') ||
      (player[1] == 'B' && player[0] == 'A') ||
      (player[1] == 'C' && player[0] == 'B')) {  // i win
      myOutcomeScore = 6
    }

    myScorePerRound.push(myShapeScore + myOutcomeScore)
  });

  return myScorePerRound
}