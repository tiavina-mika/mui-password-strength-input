# mui-password-strength-input

<p  align="center">

<b>mui-password-strength-input</b>: A <a  href="https://mui.com/material-ui/getting-started/overview/">Material-UI</a> password input with password strength indicator.
</p>


## Table of Contents

<details>

- [mui-password-strength-input](#mui-password-strength-input)
  - [Table of Contents](#table-of-contents)
  - [Demo](#demo)
  - [Installation](#installation)
  - [Get started](#get-started)
    - [Simple usage](#simple-usage)
    - [Custom labels and bar colors](#custom-labels-and-bar-colors)
      - [custom all strength options](#custom-all-strength-options)
      - [custom selected strength options](#custom-selected-strength-options)
    - [Custom styles](#custom-styles)
  - [Props](#props)
  - [Contributing](#contributing)

</details>

## Demo

- **[CodeSandbox live demo](https://codesandbox.io/s/github/tiavina-mika/mui-password-strength-input-demo)**
- **[Live demo](https://mui-password-strength-input.netlify.app/)**
- **[Demo video](https://www.youtube.com/watch?v=_VhLVN51cwo)**


<img alt="Screenshot" src="https://github.com/tiavina-mika/mui-password-strength-input/blob/main/screenshots/screenshot.png" />

## Installation

```shell

npm  install  mui-password-strength-input

```
or
```shell

yarn  add  mui-password-strength-input

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
import PasswordStrengthInput from 'mui-password-strength-input';
import { useState } from "react";

function App() {
  return (
    <PasswordStrengthInput />
  );
}
```

### Custom labels and bar colors
#### custom all strength options
```tsx
    <PasswordStrengthInput
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
```

#### custom selected strength options
```tsx
    <PasswordStrengthInput
      options={{
        tooWeak: {
          label: 'Too weak 2',
          color: 'red',
        },
        weak: {
          label: 'Weak 2',
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

See [`example/App.tsx`](https://github.com/tiavina-mika/mui-password-strength-input/tree/main/example) for a more example of using `PasswordStrengthInput`.

## Props

|props |type                          | Default value                         | Description |
|----------------|-------------------------------|-----------------------------|-----------------------------|
|options|`Options`|null|Options to override colors and labels of each strength
|barClassName|`string`|empty|custom class name of the each bar indicator
|strengthLabelClassName|`string`|empty|custom class name of the strength label
|className|`string`|empty|custom class name of text input

## Contributing

Get started [here](https://github.com/tiavina-mika/mui-password-strength-input/blob/main/CONTRIBUTING.md).
