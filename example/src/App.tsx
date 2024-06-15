import { Container, ThemeProvider, createTheme } from '@mui/material';
import { PasswordStrengthInput } from 'mui-password-strength-input';

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <PasswordStrengthInput
          barClassName="!w-[50px]"
          strengthLabelClassName="!text-xl"
          className="!w-full !border-1 !b-green-500"
          options={{
            tooWeak: {
              label: 'Too weak 2',
              color: 'red',
            },
            weak: {
              label: 'Weak 2',
              color: 'yellow',
            },
            medium: {
              label: 'Medium 2',
              color: 'green',
            },
            strong: {
              label: 'Strong 2',
              color: 'blue'
            },
          }}
        />
      </Container>
    </ThemeProvider>
  )
}

export default App
