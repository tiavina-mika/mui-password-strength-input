# mui-password-strength-input

<p align="center">

A <a href="https://mui.com/material-ui/getting-started/overview/">Material-UI</a> password text field with password strength indicator.
</p>

## Demo

- **[CodeSandbox](https://codesandbox.io/s/github/tiavina-mika/mui-password-strength-input-demo)**
- **[Live demo](https://mui-password-strength-input.netlify.app/)**

<br />

![Gif](https://github.com/tiavina-mika/mui-password-strength-input/blob/main/screenshots/example.gif)

## Installation

```shell

npm install mui-password-strength-input

```
or
```shell

yarn add mui-password-strength-input

```
Please note that [`@mui/material`](https://mui.com/material-ui/getting-started/installation/) (and their `@emotion/` peers) are peer dependencies, meaning you should ensure they are installed before installing `mui-password-strength-input`.

```shell
npm install @mui/material @emotion/react @emotion/styled
```
or
```shell
yarn add @mui/material @emotion/react @emotion/styled
```

## Get started

### Simple usage

```tsx
import PasswordStrengthInput from 'password-strength-input';

function App() {
  const [password, setPassword] = useState<string>('');

  const handlePasswordChange = (value: string) => setPassword(value);

  return (
    <PasswordStrengthInput value={value} onChange={handlePasswordChange} />
  );
}
```

### Override labels and bar colors
#### Override strength options
```tsx
    <PasswordStrengthInput
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
    />
```

#### Override selected strength options only
```tsx
    <PasswordStrengthInput
      options={{
        tooWeak: {
          label: 'Trop faible',
          color: 'red',
        },
        weak: {
          label: 'Faible',
        },
        medium: {
          color: 'green',
        },
      }}
    />
```

### Custom styles

```tsx
  <PasswordStrengthInput
    barClassName="!w-[50px]"
    strengthLabelClassName="!text-xl"
    className="!w-full
  />
```

### Custom icons

```tsx
  <PasswordStrengthInput
    hidePasswordIcon={<EyeOff />}
    showPasswordIcon={<EyeOn />}
  />
```


### Material-UI TextField props

```tsx
  <PasswordStrengthInput
    placeholder="Enter your password"
    // ...other mui TextField props
  />
```

See [`here`](https://github.com/tiavina-mika/mui-password-strength-input/tree/main/example) for more examples that use `PasswordStrengthInput`.

## Props

|Props |Type                          | Default value                         | Description |
|----------------|-------------------------------|-----------------------------|-----------------------------|
|options|`Options`|null|Options to override colors and labels of each strength
|barClassName|`string`|empty|Each bar indicator class name
|strengthLabelClassName|`string`|empty|Strength label class name
|className|`string`|empty|TextField class name
|hidePasswordIcon|`ReactNode`|null|Custom icon to hide password
|hidePasswordIcon|`ReactNode`|null|Custom icon to show password
|barWidth|`number`|null|Width of each bar. By default, if not defined the bar will use `flex` 1
|...otherProps|`TextFieldProps`|null|All mui `TextField` props

## Contributing

Get started [here](https://github.com/tiavina-mika/mui-password-strength-input/blob/main/CONTRIBUTING.md).
