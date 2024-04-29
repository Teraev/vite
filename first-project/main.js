const baseURL = "http://localhost:8080"

const but = document.querySelector('.create_button')
const table = document.querySelector('.table')
const tbody = document.querySelector('.tbody')

fetch(baseURL + '/users')
  .then(res => res.json())
  .then(res => console.log(res))

but.onclick = (e) => {
  e.preventDefault()
  const userName = prompt('Enter user name:');

  fetch(baseURL + '/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: userName }),
  })
    .then(res => res.json())
    .then(user => {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      const id = document.createElement('td')
      id.classList.add('id')
      const marks = document.createElement('td')
      const marks2 = document.createElement('td')
      const marks3 = document.createElement('td')
      const marks4 = document.createElement('td')
      cell.innerHTML = user.name;
      id.innerHTML =  String(Math.floor(Math.random() * 10))

      const del_but = document.createElement('button')
      del_but.classList.add('buttons')
      del_but.innerHTML = "delete"
      const edit_but = document.createElement('button')
      edit_but.classList.add('buttons')
      edit_but.innerHTML = "edit"
      const but = document.createElement('div')
      but.classList.add('but_div')
      but.append(del_but, edit_but)


      row.append(id);
      row.append(cell);
      row.append(marks);
      row.append(marks2);
      row.append(marks3);
      row.append(marks4);
      tbody.appendChild(row);
      tbody.append(but)



      table.append(tbody);


      edit_but.onclick = () => {
        const newName = prompt('Enter new name:');
        fetch(baseURL + "/users/" + user.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newName }),
        })
          .then(res => res.json())
          .then(res => {
            cell.textContent = res.name;
            user.name = res.name;
          })
      }
      del_but.onclick = () => {
        fetch(baseURL + "/users/" + user.id, {
          method: 'DELETE',
        })
          .then(res => {
            tbody.removeChild(row);
            but.remove();
          })
      }
    })
}