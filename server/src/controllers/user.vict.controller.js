import victim from '../models/user.victim.model.js'

export const registerVict = async (req, res) => {
  const { name, email, state, city, password } = req.body
  try {
    //!Validacion de la base de datos
    const exist = await victim.find({ email })
    if (exist.length > 0) {
      return res.status(400).send('El correo electrónico que desea ingresar ya se encuentra en nuestro sistema')
    }
    //!Fin validacion
    //*Encriptacion
    const passHash = await bcrypt.hash(password, 10)
    //*Creacion de usuario
    const newVictim = new victim({ name, email, state, city, password: passHash })
    await newVictim.save()
    res.status(201).send('El registro ha sido un exito')
  } catch (error) {
    res.status(500).send('Se produjo un error en el servidor')
  }
}

export async function login(req, res) {
  res.send("login");
}

export async function logout(req, res) {
  res.send("logout");
}
