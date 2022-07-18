let userData = {};
document.getElementById('newuser').addEventListener('click', (e) => {
  e.preventDefault();
  const userName = document.getElementById('fname').value;
  const userSurname = document.getElementById('lname').value;
  const userEmail = document.getElementById('eaddress').value;
  const age = document.getElementById('age').value;

  userData = {
    name: userName,
    surname: userSurname,
    email: userEmail,
    age,
  };
  fetchNewUser();
});

async function fetchNewUser() {
  const result = await fetch(
    '/users',
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userData),
    },
  );
  window.location.replace('/');
  return result.json();
}

