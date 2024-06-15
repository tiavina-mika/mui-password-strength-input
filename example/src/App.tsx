import { Container, ThemeProvider, Typography, createTheme } from '@mui/material';
import PasswordStrengthInput from 'mui-password-strength-input';

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <div className="flex flex-col gap-2 mb-16">
          <Typography variant="h5">mui-password-strength-input</Typography>
          <p>Click on the input field and type a password to see the strength indicator</p>
        </div>
        <PasswordStrengthInput
          placeholder="Enter your password"
          barClassName="!w-[50px]"
          strengthLabelClassName="!text-xl"
          className="!w-full !border-1 !border !b-green-500"
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
