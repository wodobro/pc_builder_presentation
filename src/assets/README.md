# Source Assets

This folder contains assets that will be processed by the build system.

## Structure

- **images/** - Images that need optimization (png, jpg, svg)
- **icons/** - Icon files and small graphics

## Usage

Import these assets directly in your components:
```tsx
import heroImage from '@/assets/images/hero.jpg';
import logo from '@/assets/icons/logo.svg';

<img src={heroImage} alt="Hero" />
```
