async function fetchUsers() {
  const result = await fetch(
    '/users',
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
      },
    },
  );
  const json = await result.json();
  createUserCards(json);

  document.querySelectorAll('.deleteUser').forEach((el) => {
    el.addEventListener('click', async () => {
      await deleteCard(el.value);
      el.closest('.userCard').remove();
    });
  });
}

fetchUsers();

function createUserCards(objects) {
  objects.forEach((element) => {
    const {
      _id, name, surname, email, age,
    } = element;

    const main = document.querySelector('.card-holder');
    const div = document.createElement('div');
    const innerdiv = document.createElement('div');
    const h4 = document.createElement('h4');
    const pEmail = document.createElement('p');
    const pAge = document.createElement('p');
    const button = document.createElement('button');
    button.className = 'btn btn-danger deleteUser';
    button.value = _id;

    div.className = 'col-lg-3 mb-3';
    innerdiv.className = 'userCard card p-3';
    innerdiv.appendChild(h4).innerText = `${name} ${surname}`;
    h4.className = 'text-primary mb-4';
    innerdiv.appendChild(pEmail).innerText = `Email Address: ${email}`;
    innerdiv.appendChild(pAge).innerText = `Age: ${age}`;
    innerdiv.appendChild(button).innerText = 'Delete';

    div.appendChild(innerdiv);
    main.appendChild(div);
  });
}

function deleteCard(id) {
  return fetch(`/users/${id}`, {
    method: 'DELETE',
  });
}
