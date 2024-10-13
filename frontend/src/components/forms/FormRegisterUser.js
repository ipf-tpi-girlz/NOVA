export const FormRegisterUser = () => {
  // Crear formulario de registro
  const formContainer = document.createElement('div')
  formContainer.className =
    'bg-base-200 px-5 pt-5 pb-2 rounded-lg shadow md:w-4/5 mx-auto'

  const h2 = document.createElement('h2')
  h2.className = 'text-2xl font-semibold mb-6 text-center'
  h2.innerText = 'Registro de Usuario'
  formContainer.appendChild(h2)

  // Crear el formulario
  const form = document.createElement('form')
  form.className = 'space-y-4'
  form.id = 'form-register'
  formContainer.appendChild(form)

  // Función para crear grupos de formularios
  function createFormGroup(
    labelText,
    inputType,
    inputId,
    name,
    placeholder = '',
    required = true
  ) {
    const div = document.createElement('div')
    div.className = 'form-group'

    const label = document.createElement('label')
    label.className = 'block text-sm font-medium'
    label.setAttribute('for', inputId)
    label.innerText = labelText
    div.appendChild(label)

    const input = document.createElement(
      inputType === 'select' ? 'select' : 'input'
    )
    input.className = 'form-control input w-full'
    input.id = inputId
    input.name = name // Atributo name para enviar los datos al backend
    if (inputType !== 'select') {
      input.type = inputType
      input.placeholder = placeholder
      if (required) input.required = true
    }

    div.appendChild(input)
    return div
  }

  // Crear cada campo del formulario con el atributo 'name' correcto
  const nombreField = createFormGroup(
    'Nombre y Apellido:',
    'text',
    'nombre',
    'nombre',
    'Ingrese su nombre'
  )
  form.appendChild(nombreField)

  const gmailField = createFormGroup(
    'Correo Electrónico :',
    'email',
    'mail',
    'mail',
    'Ingrese su correo de Gmail'
  )
  form.appendChild(gmailField)

  const departamentoField = createFormGroup(
    'Departamento:',
    'select',
    'departamento',
    'departamento'
  )
  const departamentos = [
    '',
    'Formosa',
    'Laishí',
    'Pilcomayo',
    'Pilagás',
    'Pirané',
    'Ramón Lista',
    'Matacos',
    'Bermejo',
  ]
  departamentos.forEach((dep) => {
    const option = document.createElement('option')
    option.value = dep
    option.innerText = dep === '' ? 'Seleccione su departamento' : dep
    departamentoField.querySelector('select').appendChild(option)
    departamentoField.querySelector('select').classList.add('select')
  })
  form.appendChild(departamentoField)

  const localidadField = createFormGroup(
    'Localidad:',
    'text',
    'localidad',
    'localidad',
    'Ingrese su localidad'
  )
  form.appendChild(localidadField)

  const generoField = createFormGroup(
    'Género (Opcional):',
    'select',
    'genero',
    'genero'
  )
  const generos = ['', 'Femenino', 'Masculino', 'Otro', 'Prefiero no decirlo']
  generos.forEach((gen) => {
    const option = document.createElement('option')
    option.value = gen
    option.innerText = gen === '' ? 'Seleccione su género' : gen
    generoField.querySelector('select').appendChild(option)
    generoField.querySelector('select').classList.add('select')
  })
  form.appendChild(generoField)

  const passwordField = createFormGroup(
    'Contraseña:',
    'password',
    'contrasenia',
    'Ingrese una contraseña'
  )
  form.appendChild(passwordField)

  // Botón de envío
  const submitButton = document.createElement('button')
  submitButton.type = 'submit'
  submitButton.className = 'btn w-full btn-primary py-2 rounded-lg'
  submitButton.innerText = 'Registrarse'
  form.appendChild(submitButton)

  //evento
  form.addEventListener('submit', async (evento) => {
    evento.preventDefault()

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value
    const mail = document.getElementById('mail').value
    const departamento = document.getElementById('departamento').value
    const localidad = document.getElementById('localidad').value
    const genero = document.getElementById('genero').value
    const contrasenia = document.getElementById('contrasenia').value

    // Validar los campos
    if (
      nombre === '' ||
      mail === '' ||
      departamento === '' ||
      localidad === '' ||
      genero === '' ||
      contrasenia === ''
    ) {
      alert('todos los cmapos son obligatorios')
      return
    }

    try {
      // Enviar los datos al backend con fecht
      const response = await fetch('http://localhost:4000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          mail,
          departamento,
          localidad,
          genero,
          contrasenia,
          role: 'victima',
        }),
      })
      const result = await response.json()
      console.log(result)
      // registro exitoso del registro con un
      if (result.ok) {
        console.log({ mensagge: 'se ha registrado exitosamente' })
      }

      window.location.href = 'http://localhost:5173/login'
    } catch (error) {
      if (error.response && error.response.status === 400) {
      } else {
        console.error(error.response.data.error)
      }
    }
  })

  return formContainer
}