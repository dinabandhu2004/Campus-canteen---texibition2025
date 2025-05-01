// Handle email/password form submission
document.getElementById('emailLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation
    if (!email) {
        showError('emailError', 'Please enter your email');
        return;
    }
    
    if (!password) {
        showError('passwordError', 'Please enter your password');
        return;
    }
    
    // Here you would typically send the credentials to your server for verification
    // For demo purposes, we'll simulate a successful login
    simulateEmailLogin();
});

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideErrors() {
    document.getElementById('emailError').style.display = 'none';
    document.getElementById('passwordError').style.display = 'none';
}

function simulateEmailLogin() {
    // In a real app, you would make an API call to your backend here
    console.log('Simulating email login...');
    
    // For demo purposes, we'll just redirect after a short delay
    setTimeout(() => {
        window.location.href = 'menu.html';
    }, 1000);
}

// Google Sign-In functionality
function handleCredentialResponse(response) {
    console.log("Google sign-in response:", response);
    
    // Here you would typically verify the credential with your backend
    // For demo purposes, we'll just parse the JWT to get user info
    const responsePayload = parseJwt(response.credential);
    
    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);
    
    // Redirect to menu page
    window.location.href = 'menu.html';
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// Initialize Google Sign-In
window.onload = function() {
    google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com', // Replace with your actual client ID
        callback: handleCredentialResponse
    });
    
    google.accounts.id.renderButton(
        document.getElementById('gSignInBtn'),
        { theme: 'outline', size: 'large' }  // customization attributes
    );
    
    google.accounts.id.prompt(); // also display the One Tap dialog
};