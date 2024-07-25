document.getElementById('translate-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const source = document.getElementById('source').value;
    const target = document.getElementById('target').value;
    const text = document.getElementById('text').value;
    const buttonText = document.getElementById('button-text');
    const loader = document.getElementById('loader');

    // Show loader and disable button
    buttonText.style.display = 'none';
    loader.style.display = 'block';
    document.getElementById('submit-button').disabled = true;

    try {
        const response = await fetch('http://localhost:3000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ source, target, text })
        });

        const result = await response.json();
        document.getElementById('result').innerText = result[0].result;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'An error occurred. Please try again.';
    } finally {
        // Hide loader and enable button
        buttonText.style.display = 'block';
        loader.style.display = 'none';
        document.getElementById('submit-button').disabled = false;
    }
});
