function previewImage(event) {
  const image = document.getElementById('imagePreview');
  image.innerHTML = '';
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function() {
    const img = document.createElement('img');
    img.src = reader.result;
    image.appendChild(img);
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}

function predictImage() {
  const fileInput = document.getElementById('imageUpload');
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('file', file);

  fetch('/predict', {
    method: 'POST',
    body: formData,
  })
  .then(response => response.json())
  .then(data => {
    const resultDiv = document.getElementById('predictionResult');
    resultDiv.textContent = `Prediction: ${data.prediction}`;
  })
  .catch(error => console.error('Error:', error));
}
