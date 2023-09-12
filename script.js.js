

async function register(ev) {
    ev.preventDefault();

 const name= document.getElementById("full_name").value;
 const email= document.getElementById("email").value;
 const mobile= document.getElementById("mobile_no").value;
 const password = document.getElementById("password").value;

    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({name,email,mobile,password}),
      headers: {'Content-Type':'application/json'},
    });
    if (response.status === 200) {
      alert('registration successful');
    } else {
      alert('registration failed');
    }
  }


  async function login(ev) {
    ev.preventDefault();

    const email= document.getElementById("user_name").value;
    const mobile= document.getElementById("user_name").value;
    const password = document.getElementById("password").value;
    
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
   
    });
    if (response.ok) {
      response.json().then(userInfo => {
        alert('login successful')
      });
    } else {
      alert('wrong credentials');
    }
  }