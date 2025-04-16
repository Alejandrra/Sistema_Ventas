import React from 'react';
import {
  Avatar,  // Componente que muestra un avatar circular
  Button,  // Componente para crear botones
  TextField, // Componente para campos de texto
  FormControlLabel, // Componente que envuelve un control con su etiqueta (como un checkbox)
  Checkbox, // Componente para crear una casilla de verificación
  Link, // Componente para crear enlaces estilizados
  Paper, // Componente que crea un panel elevado
  Box, // Contenedor flexible para organizar elementos
  Grid, // Componente para crear una cuadrícula y gestionar el diseño
  Typography, // Componente para gestionar la tipografía (textos)
} from '@mui/material'; // Importa varios componentes de Material-UI para diseñar la interfaz
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // importa el icono de candado
import FacebookIcon from '@mui/icons-material/Facebook'; // importa el icono de facebook
import GoogleIcon from '@mui/icons-material/Google'; // importa el icono de google

const Login = () => { // Define el componente Login
  return (
    <Grid // Componente Grid que actúa como contenedor principal
      container // Define un contenedor que se organiza en una cuadrícula
      component="main" // se define que Grid es el componente principal
      sx={{ //Estilos de mui
        height: '100vh',
        backgroundColor: '#0d1117',
        justifyContent: 'center', //Centra los elementos horizontal
        alignItems: 'center', //Centra los elementos vertical
      }}
    >
      <Grid
        item // Indica que este Grid es un ítem dentro del contenedor
        xs={11} // En pantallas pequeñas (xs) ocupará el 11/12 del ancho
        sm={8} // En pantallas medianas (sm) ocupará el 8/12 del ancho
        md={5} // En pantallas grandes (md) ocupará el 5/12 del ancho
        component={Paper} // Usa Paper para crear un panel con sombra
        elevation={6} // Nivel de sombra del Paper
        square // Hace que el Paper tenga bordes rectos en lugar de redondeados
        sx={{ //estilos de mui
          backgroundColor: '#0d1117',
          color: 'white',
          p: 4, // Padding de 4 unidades alrededor del contenido
          borderRadius: 2, // Bordes redondeados
        }}
      >
        <Box // Componente Box usado para organizar los elementos internos del formulario
          sx={{ 
            display: 'flex', // Usa flexbox para disposición de los elementos
            flexDirection: 'column', // Los elementos se dispondrán en una columna
            alignItems: 'center', // Centra los elementos horizontalmente
          }}
        >
          
          <Avatar
           //Avatar circular con ícono
          sx={{ m: 1, bgcolor: '#1976d2' }}> 
           <LockOutlinedIcon />

          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Sign in
          </Typography>

          <Box
          // Define un formulario sin validaciones HTML  
            component="form" noValidate sx={{ width: '100%' }}>
            <TextField // Primer campo de texto (Email)
              margin="normal" // Aplica márgenes normales
              required // Hace el campo obligatorio
              fullWidth // Hace que el campo ocupe todo el ancho disponible
              id="email" // ID del campo para identificarlo en el formulario
              label="Email" // Etiqueta que aparecerá en el campo
              name="email" // Nombre del campo, útil para el envío de datos
              autoComplete="email" // Sugiere la autocompletación del campo con direcciones de correo
              autoFocus // El campo de Email será el primero en el foco cuando se carga la página
              InputProps={{ style: { color: 'white' } }} // Estilo para el color del texto ingresado
              InputLabelProps={{ style: { color: '#aaa' } }} // Estilo para el color de la etiqueta
              sx={{ backgroundColor: '#161b22', borderRadius: 1 }} // Estilo de fondo y bordes redondeados
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password" // Tipo de campo, para que se oculte el texto
              id="password"
              autoComplete="current-password" // Sugiere la autocompletación de la contraseña actual
              InputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: '#aaa' } }}
              sx={{ backgroundColor: '#161b22', borderRadius: 1 }}
            />

            <FormControlLabel // Etiqueta y control para la casilla de "Recordarme"
              // Casilla de verificación
              control={<Checkbox value="remember" sx={{ color: 'white' }} />}
              label="Remember me"
            />

            <Button // Botón para enviar el formulario
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, backgroundColor: '#c9d1d9', color: '#0d1117' }} // Estilos de margen, color de fondo y texto
            >
              Sign in
            </Button > 

            <Grid
            // Contenedor para los enlaces 
              container justifyContent="center"> 
              <Grid item>
                <Link 
                // Enlace para recuperar la contraseña
                  href="#" variant="body2" sx={{ color: '#58a6ff' }}>
                  Forgot your password? 
                </Link>
              </Grid>
            </Grid>

            <Button // Botón para iniciar sesión con Google
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />} // Ícono de Google
              sx={{
                mt: 3,
                color: 'white',
                borderColor: '#30363d',
                '&:hover': { borderColor: '#58a6ff' }, // Cambia el color del borde al pasar el ratón
              }}
            >
              Sign in with Google
            </Button>

            <Button // Botón para iniciar sesión con Facebook
              fullWidth 
              variant="outlined"
              startIcon={<FacebookIcon />} // Ícono de Facebook
              sx={{
                mt: 2,
                color: 'white',
                borderColor: '#30363d',
                '&:hover': { borderColor: '#58a6ff' },
              }}
            >
              Sign in with Facebook
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 3, color: '#8b949e' }}>
              Don’t have an account?{' '}
              <Link href="#" variant="body2" sx={{ color: '#58a6ff' }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
