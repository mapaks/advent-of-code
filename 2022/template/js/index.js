const input = document.querySelector('input[type="file"]')

input.addEventListener('change', function() {
  
  const file = this.files[0];

  const reader = new FileReader()

  reader.onload = function() {
    const text = reader.result;

    // Add code here
  };

  reader.readAsText(file)
})
