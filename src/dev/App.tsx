import { Container, ThemeProvider, createTheme } from '@mui/material';
import PasswordStrengthInput from '../PasswordStrengthInput';

const theme = createTheme();
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <PasswordStrengthInput labels={{
          tooWeak: 'Too weak 2',
          weak: 'Weak 2',
          medium: 'Okay 2',
          strong: 'Strong 2',
        }} />
      </Container>
    </ThemeProvider>
  )
}

export default App
