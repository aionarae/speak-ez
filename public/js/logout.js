document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            // Perform the fetch request to the logout endpoint
            fetch('/logout', {
                method: 'POST',  // Assuming logout requires a POST request
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin'  // This might be necessary for sessions or including cookies with the request
            }).then(response => {
                if (response.ok) {
                    console.log('Logout successful');
                    window.location.href = '/';  // Redirect to homepage after logout
                } else {
                    throw new Error('Logout failed');
                }
            }).catch(error => {
                console.error('Error:', error);
            });
        });
    }
});
