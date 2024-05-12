# Table of Contents

- [Table of Contents](#table-of-contents)
- [Button Component Documentation](#button-component-documentation)
  - [Features](#features)
  - [Usage](#usage)
    - [Basic Button](#basic-button)
    - [Customizing the Button](#customizing-the-button)
      - [Examples](#examples)
  - [Styling](#styling)
- [PerformanceStatus Component Documentation](#performancestatus-component-documentation)
  - [Features](#features-1)
  - [Usage](#usage-1)
    - [Basic Usage](#basic-usage)
    - [Customizing the PerformanceStatus](#customizing-the-performancestatus)
# Button Component Documentation

## Features

- **Variants**: Supports `contained`, `outlined`, `text`, and `soft` styles.
- **Sizes**: Available in `sm` (small), `md` (medium), and `lg` (large) sizes.
- **Colors**: Can be styled with predefined color themes such as `primary`, `secondary`, `accent`, `success`, `info`, `warning`, and `error`.
- **Disabled State**: Can be rendered in a disabled state, preventing user interaction.
- **Link Integration**: Optionally functions as a `Link` component from `react-router-dom` for navigation purposes.

## Usage

### Basic Button

To use the `Button` component, first import it into your component file:

```javascript
import { Button } from './path/to/components';
```

Then, you can use it in your component like so:

```jsx
<Button>
  Click Me
</Button>
```

### Customizing the Button

The `Button` component accepts several props to customize its appearance and behavior:

- `variant`: Defines the button's style. Options are `contained`, `outlined`, `text`, and `soft`.
- `size`: Sets the size of the button. Options are `sm`, `md`, and `lg`.
- `color`: Determines the button's color theme. Options include `primary`, `secondary`, `accent`, `success`, `info`, `warning`, and `error`.
- `disabled`: If true, the button will be disabled and non-interactive.
- `page`: If provided, the button will render as a `Link` and navigate to the specified path.
- `className`: Allows for additional custom CSS classes to be applied.

#### Examples

**Outlined Large Success Button**

```jsx
<Button variant="outlined" size="lg" color="success">
  Success
</Button>
```

**Contained Medium Primary Button, Disabled**

```jsx
<Button variant="contained" size="md" color="primary" disabled>
  Disabled Button
</Button>
```

**Button as a Link**

To use the button as a link, provide the `page` prop with the path you want to navigate to:

```jsx
<Button page="/home" variant="contained" color="primary">
  Go to Home
</Button>
```

## Styling

The `Button` component is designed to be flexible and easily customizable through its props. However, for more specific styling needs, you can use the `className` prop to add additional classes. These classes can then be defined in your CSS or Tailwind configuration.

```jsx
<Button className="text-sm shadow-sm">
  Using className
</Button>
```


# PerformanceStatus Component Documentation

## Features

- **Customizable Number and Title**: Displays a numeric value and a corresponding title to represent a specific performance metric.
- **Customizable Color**: Allows for the background color to be customized to match different themes or significance levels.
- **Responsive Design**: Utilizes Tailwind CSS for a responsive and adaptable layout that fits various screen sizes and contexts.

## Usage

### Basic Usage

To use the `PerformanceStatus` component, first import it into your component file:

```javascript
import PerformanceStatus from './path/to/PerformanceStatus';
```

Then, you can use it in your component like so:

```jsx
<PerformanceStatus number={20} title="Completed Tasks" color="#4ade80" />
```

### Customizing the PerformanceStatus

The `PerformanceStatus` component accepts three props to customize its appearance:

- `number`: The numeric value to display, representing the performance metric.
- `title`: The title or label associated with the performance metric.
- `color`: The background color of the component, specified in hexadecimal format.
