import { Container, ThemeProvider, createTheme } from '@mui/material';
import PasswordStrengthInput from '../PasswordStrengthInput';

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <PasswordStrengthInput
          className='input'
          options={{
            tooWeak: {
              label: 'Trop faible',
              color: 'red',
            },
            weak: {
              label: 'Faible',
              color: 'yellow',
            },
            medium: {
              label: 'Moyen',
              color: 'green',
            },
            strong: {
              label: 'Fort',
              color: 'blue'
            },
          }}
          // barWidth={40}
        />
      </Container>
    </ThemeProvider>
  )
}

export default App
