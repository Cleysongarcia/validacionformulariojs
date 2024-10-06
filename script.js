// document.getElementById('formulario').addEventListener('submit',(event) => {
//     event.preventDefault()

const firebaseConfig = {
    apiKey: "AIzaSyDnJl0iHU__FJPTVvLjFf7nTSAjVCiWoLo",
    authDomain: "datos-formulario-7b8db.firebaseapp.com",
    projectId: "datos-formulario-7b8db",
    storageBucket: "datos-formulario-7b8db.appspot.com",
    messagingSenderId: "22905525732",
    appId: "1:22905525732:web:d3b3a2512d9ca1b0cce3f1",
    measurementId: "G-QW5KZCB6D9"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();




document.getElementById('formulario').addEventListener('submit',(event) => {
event.preventDefault()


    //validar campo nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if(entradaNombre.value.trim() === '') {
            errorNombre.textContent = 'Por favor, introduce tu nombre'
            errorNombre.classList.add('error-message')    
        } else {
            errorNombre.textContent = ''
            errorNombre.classList.remove('error-message') 
        }

    // validar correo electronico
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación básico
    if(!emailPattern.test(emailEntrada.value)){
        emailError.textContent = 'Por favor, introduce un Email valido'
        emailError.classList.add('error-message')    
    }else {
        emailError.textContent = ''
        emailError.classList.remove('error-message') 
    }

    //validar contraseña
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    if(!contrasenaPattern.test(contrasenaEntrada.value)) {
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, numeros, mayusculas y minusculas y caracteres especiales'
        contrasenaError.classList.add('error-message')  
    }else {
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message') 
    }

    //Si todos los campos son validos enviar formulario
    if(!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {

        
        //BACKEND QUE RECIBA LA INFORMACIÓN
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con Exito', docRef.id)
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error)
        });

        
        
    }

});