## Stylelint ignore bug

This repo contains source code that reproduces stylelint ignore bug.

Steps to reproduce:
1. Run `npm run build` two times

Expected:

Stylelint ignores css files inside dist dir because
it was populated with .stylelintignore file

Actual:

Stylelint fails with exit code 1 and lints all css files
inside dist build directory
