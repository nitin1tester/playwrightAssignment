Playwright Hybrid Automation Framework

# Playwright Framework Demo Automation Reports

Welcome to the **PWSwagLabsUIFramework** automation project. Below you can find the latest test results and HTML reports.

---

## Workflow Status

<!-- [![Playwright Tests](https://github.com/nitin1tester/playwrightAssignment/blob/main/.github/workflows/playwright-run.yml/badge.svg)](https://github.com/nitin1tester/playwrightAssignment/blob/main/.github/workflows/playwright-run.yml) -->

[![Playwright Tests](https://github.com/nitin1tester/playwrightAssignment/actions/workflows/playwright-run.yml/badge.svg)](https://github.com/nitin1tester/playwrightAssignment/actions/workflows/playwright-run.yml)

---

## Dashboard 

Click the badges below to view the Dashboard published via GitHub Pages:

[![Playwright Dashboard](https://img.shields.io/badge/Playwright-Dashboard-pink)](https://nitin1tester.github.io/playwrightAssignment/index.html)

---

## HTML Reports

Click the badges below to view the latest reports published via GitHub Pages:

ESLint:

[![Playwright ESLint Report](https://img.shields.io/badge/Playwright-Report-yellow)](https://nitin1tester.github.io/playwrightAssignment/eslint-report/index.html)

Dev Environment:

[![Playwright Dev Report](https://img.shields.io/badge/Playwright-Report-blue)](https://nitin1tester.github.io/playwrightAssignment/dev/playwright-report/index.html)
[![Playwright Dev HTML Reporter](https://img.shields.io/badge/Playwright_HTML-Report-green)](https://nitin1tester.github.io/playwrightAssignment/dev/playwright-html-report/index.html)
[![Allure Dev Report](https://img.shields.io/badge/Allure-Report-red)](https://nitin1tester.github.io/playwrightAssignment/dev/allure-report/index.html)

QA Environment:

[![Playwright QA Report](https://img.shields.io/badge/Playwright-Report-blue)](https://nitin1tester.github.io/playwrightAssignment/qa/playwright-report/index.html)
[![Playwright QA HTML Reporter](https://img.shields.io/badge/Playwright_HTML-Report-green)](https://nitin1tester.github.io/playwrightAssignment/qa/playwright-html-report/index.html)
[![Allure QA Report](https://img.shields.io/badge/Allure-Report-red)](https://nitin1tester.github.io/playwrightAssignment/qa/allure-report/index.html)

Stage Environment:

[![Playwright Stage Report](https://img.shields.io/badge/Playwright-Report-blue)](https://nitin1tester.github.io/playwrightAssignment/stage/playwright-report/index.html)
[![Playwright Stage HTML Reporter](https://img.shields.io/badge/Playwright_HTML-Report-green)](https://nitin1tester.github.io/playwrightAssignment/stage/playwright-html-report/index.html)
[![Allure Stage Report](https://img.shields.io/badge/Allure-Report-red)](https://nitin1tester.github.io/playwrightAssignment/stage/allure-report/index.html)

Production Environment:

[![Playwright Production Report](https://img.shields.io/badge/Playwright-Report-blue)](https://nitin1tester.github.io/playwrightAssignment/prod/playwright-report/index.html)
[![Playwright Production HTML Reporter](https://img.shields.io/badge/Playwright_HTML-Report-green)](https://nitin1tester.github.io/playwrightAssignment/prod/playwright-html-report/index.html)
[![Allure Production Report](https://img.shields.io/badge/Allure-Report-red)](https://nitin1tester.github.io/playwrightAssignment/prod/allure-report/index.html)



---

## Notes

- Playwright HTML report is generated automatically from `npx playwright test`.  
- Allure report is generated from the `allure-results` folder.  
- Both reports are published to `gh-pages` branch and updated on each workflow run.

This README includes:

* Setup instructions
* How to run tests locally
* Framework architecture explanation
* Team onboarding guide
* CI/CD pipeline details

Overview

This project is a scalable hybrid automation framework built using Playwright + TypeScript.

The framework supports:

* UI Automation
* API Automation
* Cross-browser execution
* CI/CD integration using GitHub Actions
* Allure Reporting
* Structured logging using Pino
* Scalable Page Object Model architecture
* Reusable API client architecture
* Parallel execution support

The framework is designed following enterprise-level automation architecture principles suitable for large-scale test automation projects.

⸻

Tech Stack

Tool	Purpose
Playwright	UI + API automation
TypeScript	Programming language
Pino	Structured logging
Allure	Reporting
GitHub Actions	CI/CD
Node.js	Runtime

⸻

Framework Architecture

The framework is designed using enterprise-grade automation architecture principles with proper separation between reusable framework components and executable test cases.

High-Level Design

<img width="395" height="863" alt="Screenshot 2026-05-20 at 21 56 56" src="https://github.com/user-attachments/assets/c9eab4c3-d8ff-4f8a-8efd-cd4c1411b012" />

PWSwagLabsUIFramework

The framework is divided into reusable framework components and executable test cases.

* src → reusable framework code
* tests → executable automation test cases
* logs → framework execution logs
* reports → execution reports and artifacts
* configs → environment-specific configurations

Benefits:

* scalable architecture
* reusable framework components
* maintainable test design
* better team onboarding
* clean separation of concerns

⸻

API Layer

Location:

src/api

src/api/clients

Contains reusable API client classes.

Responsibilities:

* centralized API calls
* reusable CRUD methods
* authentication handling
* request abstraction
* logging integration

Example:

await client.createBooking();
await client.updateBooking();

⸻

src/api/data

Contains reusable API payloads and test data.

Benefits:

* reusable request payloads
* centralized data management
* easy maintenance

⸻

UI Layer

Location:

src/gui

The UI framework follows the Page Object Model (POM) design pattern.

Benefits:

* reusable page methods
* reduced locator duplication
* better readability
* scalable UI architecture

⸻

src/gui/pages

Contains Page Object classes.

Responsibilities:

* locators
* page actions
* business workflows

Example:

await loginPage.doLogin();

⸻

src/gui/data

Contains UI test data.

Examples:

* CSV files
* test users
* checkout data

Supports data-driven testing.

⸻

src/gui/fixtures

Contains reusable Playwright fixtures.

Used for:

* dependency injection
* common setup
* shared initialization
* reusable test setup

⸻

src/gui/error

Contains custom framework error handling.

Used for:

* reusable framework exceptions
* validation handling
* centralized error abstraction

⸻

Utilities Layer

Location:

src/utils

Contains reusable helper classes.

logger.ts

Centralized logging utility using Pino Logger.

Features:

* console logging
* file logging
* structured logs
* error tracking
* execution traceability

Log output:

logs/application.log

⸻

ElementUtil.ts

Reusable Playwright helper methods.

Examples:

* click utilities
* wait utilities
* visibility utilities
* reusable UI actions

⸻

Tests Layer

Location:

tests

Contains executable automation test cases.

⸻

tests/api

Contains API automation test cases.

Examples:

* authentication tests
* booking CRUD validation
* API negative scenarios

⸻

tests/gui

Contains UI automation test cases.

Examples:

* login validation
* inventory validation
* checkout flow validation

Supports cross-browser execution.

⸻

Reports & Execution Artifacts

allure-results

Stores raw Allure execution data.

⸻

allure-report

Generated Allure HTML report.

⸻

playwright-report

Default Playwright HTML report.

⸻

test-results

Stores screenshots, traces, and videos.

⸻

Logging

Location:

logs/application.log

The framework uses centralized structured logging for:

* API execution tracking
* debugging
* execution monitoring
* error analysis

⸻

Environment Configurations

Files:

playwright.config.qa.ts
playwright.config.stage.ts

Purpose:

* environment-specific execution
* QA/stage separation
* scalable configuration management

⸻

Configuration Files

playwright.config.ts

Controls:

* projects
* workers
* retries
* reporters
* screenshots
* traces
* browser execution

⸻

tsconfig.json

TypeScript compiler configuration.

⸻

package.json

Dependency management and execution scripts.

⸻

Architectural Principles Followed

* Page Object Model
* Reusable API client architecture
* Separation of concerns
* Structured logging
* Data-driven testing
* Parallel execution support
* CI/CD readiness
* Reusable utilities
* Cross-browser support
* Scalable folder organization

<img width="395" height="863" alt="Screenshot 2026-05-20 at 21 56 56" src="https://github.com/user-attachments/assets/c9eab4c3-d8ff-4f8a-8efd-cd4c1411b012" />

PWSwagLabsUIFramework

⸻

Framework Design Principles

UI Layer

The UI layer follows the Page Object Model (POM) design pattern.

Benefits:

* Reusability
* Maintainability
* Reduced duplication
* Better readability
* Easier onboarding

Location:

src/ui/pages

⸻

API Layer

API interactions are abstracted into reusable API clients.

Benefits:

* Centralized request handling
* Reusable CRUD operations
* Clean test cases
* Better scalability

Location:

src/api/clients

⸻

Fixtures

Custom Playwright fixtures are used for:

* Dependency injection
* Shared setup
* Shared teardown
* Common test initialization

Location:

src/gui/fixtures

⸻

Utilities

Utility classes are implemented for:

* Logging
* CSV handling
* Config management
* Common helper methods

Location:

src/utils

⸻

Logging

The framework uses Pino Logger for structured logging.

Features:

* Console logging
* File logging
* JSON structured logs
* Error stack trace logging
* Environment-aware logging

Log file location:

logs/application.log

⸻

Reporting

The framework supports:

* Playwright HTML Report
* Allure Report

⸻

Installation

Clone Repository

git clone https://github.com/nitin1tester/playwrightAssignment.git


⸻

Install Dependencies

npm install

⸻

Install Playwright Browsers

npx playwright install

⸻

Running Tests

Run All Tests

npx playwright test

⸻

Run API Tests Only

npx playwright test --project=API

⸻

Run Firefox UI Tests

npx playwright test --project=firefox

⸻

Run Chrome UI Tests

npx playwright test --project="Google Chrome"

⸻

Run Specific Spec File

npx playwright test tests/ui/swaglabs/login.spec.ts

⸻

Reports

Playwright HTML Report

npx playwright show-report

⸻

Allure Report

Install Allure:- 

npm install --save-dev allure-playwright allure-commandline

Generate report:

allure generate allure-results --clean -o allure-report

Serve report:

allure serve allure-results

⸻
This will install:
- csv-parse
- Pino
- pino-pretty

npm install csv-parse@^6.2.1 pino@^10.3.1 pino-pretty@^13.1.3

and automatically update your package.json.
⸻

Parallel Execution Strategy

The framework supports controlled parallel execution.

Configuration:

workers: process.env.CI ? 2 : 3

Benefits:

* Faster execution
* Stable browser execution
* Better CI performance
* Reduced flaky behavior

⸻

GitHub Actions CI/CD

Workflow File Location

.github/workflows/playwright.yml

⸻

GitHub Actions Workflow

name: Playwright Tests
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install Dependencies
        run: npm install
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright Tests
        run: npx playwright test
      - name: Upload Playwright Report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
      - name: Upload Allure Results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: allure-results
          path: allure-results/

⸻

Team Onboarding Guide

Step 1

Clone repository:

git clone <repository-url>

⸻

Step 2

Install dependencies:

npm install

⸻

Step 3

Install Playwright browsers:

npx playwright install

⸻

Step 4

Run tests:

npx playwright test

⸻

Best Practices Followed

* Page Object Model
* Reusable API clients
* Structured logging
* Parallel execution control
* Browser-specific projects
* Separation of framework and tests
* Environment-driven configuration
* CI/CD ready architecture
* Reusable fixtures
* Reporting integration

⸻

Future Improvements

Potential future enhancements:

* Docker integration
* Slack reporting
* Email reporting
* Data-driven execution from external sources
* Environment management
* API schema validation
* Visual testing
* Accessibility testing
* Performance testing integration

⸻

Author

Nitin Rastogi

Lead SDET Automation Framework
