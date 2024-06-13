import { Container, ThemeProvider, createTheme } from '@mui/material';
import PasswordStrengthInput from '../PasswordStrengthInput';

const theme = createTheme();
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <PasswordStrengthInput />
      </Container>
    </ThemeProvider>
  )
}

export default App
