const loginFormHandler = async (event) => {
  event.preventDefault();

  //find username value
  const username = document.querySelector('input[name="username"]');
  console.log(username)
  //find password value
  const password = document.querySelector('input[name="password"]');
  console.log(password)

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/services');
    } else {
     //alert('Failed to log in.');
      const data = await response.json();
      alert(data.message);
    }
  }
};


document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);


