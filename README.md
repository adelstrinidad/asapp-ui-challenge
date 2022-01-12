# testing-workshop-cypress
![cypress version](https://img.shields.io/badge/cypress-9.2.1-brightgreen)


## Requirements

- Any computer: Mac, Windows, Linux
- [Node 12.0.0+ (LTS)](https://nodejs.org/)
- [git](https://git-scm.com)

In order to get the code and install dependencies

```bash
git clone git@github.com:adelstrinidad/asapp-ui-challenge.git
npm install
```
## Running tests 🐛
### Opening Cypress GUI

```bash
# open Cypress GUI
npm run cypress:open
```

### Running from the CLI


```bash

# run Cypress tests headlessly
npm test
```

## Reporting
Mochawesome reporter is a custom reporter which generates a standalone HTML/CSS report to help visualize your test runs. It has simple, clean, and modern design. The report has filters to display only the tests you want and shows stack trace for failed tests.

For get the report just run `npm test` and a html file report will be generated on 'cypress/reports/html'
## Additional information 🗃

- https://www.cypress.io/
- https://docs.cypress.io/
- https://docs.cypress.io/api/api/table-of-contents.html

[ci-badge]: https://circleci.com/gh/cypress-io/testing-workshop-cypress.svg?style=svg
[ci-url]: https://circleci.com/gh/cypress-io/testing-workshop-cypress
[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
