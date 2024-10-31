import { loginUser } from '../../api/auth'
import { notification } from "antd";

export const FormLogin = () => {
  const formContainer = document.createElement('div')
  formContainer.className =
    'bg-base-200 px-5 pt-5 pb-2 rounded-lg shadow md:w-4/5 mx-auto'
  const container = document.createElement('div')
  container.appendChild(formContainer)

  const h2 = document.createElement('h2')
  h2.className = 'text-2xl font-semibold mb-6 text-center'
  h2.innerText = 'Iniciar Sesión'
  formContainer.appendChild(h2)

  // Crear el formulario
  const form = document.createElement('form')
  form.className = 'space-y-4'
  form.id = 'form-login'
  formContainer.appendChild(form)

  //funcion para crear usuario
  function crearFormgroup(
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

  // Crear el formulario con los campos
  const emailLabel = crearFormgroup(
    'Correo electrónico',
    'email',
    'mail',
    'mail'
  )
  form.appendChild(emailLabel)

  const passwordLabel = crearFormgroup(
    'Contraseña',
    'password',
    'contrasenia',
    'contrasenia'
  )
  form.appendChild(passwordLabel)

  // Botón de envío
  const submitButtoon = document.createElement('button')
  submitButtoon.type = 'submit'
  submitButtoon.className = 'btn btn-primary py-2 rounded-lg '
  submitButtoon.innerText = 'Ingresar'
  submitButtoon.setAttribute = ('href', '/home')
  form.appendChild(submitButtoon)

  // evento
  form.addEventListener('submit', async (evento) => {
    evento.preventDefault()

    //obtenemos el valor del formulario
    const mail = document.getElementById('mail').value
    const contrasenia = document.getElementById('contrasenia').value

    // Validar los datos
    if (!mail || !contrasenia) {
      alert('Todos los campos son obligatorios')
      return
    }

    // Enviar los datos al backend
    try {
      const response = await loginUser(mail, contrasenia);

      if (response && response.success) {
        notification.success({
          message: 'Inicio de sesión exitoso',
          description: response.message,
        });

        setTimeout(() => {
          window.location.href = "/home";
        }, 2000);
      } else {
        notification.error({
          message: 'Error al iniciar sesión',
          description: response.message || 'Por favor, verifica tus credenciales.',
        });
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      notification.error({
        message: 'Error en el servidor',
        description: 'Por favor, intenta de nuevo más tarde.',
      });
    }
  })

  return formContainer
}
