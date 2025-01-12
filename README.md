# Infor Design System's Enterprise Components

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![npm version](https://badge.fury.io/js/ids-enterprise.svg)](https://badge.fury.io/js/ids-enterprise)
[![Build Check](https://github.com/infor-design/enterprise-wc/actions/workflows/ci.yml/badge.svg)](https://github.com/infor-design/enterprise-wc/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/infor-design/enterprise-wc/badge.svg?branch=main)](https://coveralls.io/github/infor-design/enterprise-wc?branch=main)

Infor Design System's Enterprise component library is a framework-independent UI library consisting of CSS and JS that provides Infor product development teams, partners, and customers the tools to create user experiences that are approachable, focused, relevant and perceptive.

For guidelines on when and where to use the components see the [design.infor.com](http://design.infor.com).

## Key Features

- Multiple themes, including a WCAG 2.0 AAA compatible high-contrast theme
- Responsive components, patterns and layouts
- Touch-friendly interactions
- SVG-based iconography compatible with high DPI screens
- Built-in, extendible localization system
- Built-in mitigation of XSS exploits
- 140+ Components

## Browser Support

We support the latest release and the release previous to the latest (R-1) for browsers and OS versions:

<!-- markdownlint-disable MD013 MD033 -->
| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari |
| --------- | --------- | --------- | --------- | --------- |
| R-1 | R-1 | R-1| R-1| R-1

<!-- markdownlint-enable MD013 MD033 -->

## Installation

```sh
npm install --save ids-enterprise@latest
```

For additional usage methods, see [Installing IDS](docs/DEVELOPER.md#installing-ids-into-your-project)

## Documentation

- [Latest Release Docs](https://design.infor.com/code/ids-enterprise/latest)
- [Change Log](docs/CHANGELOG.md) (Includes latest release changes)
- [How to build the documentation from source](docs/DEVELOPER.md#basic-commands)
In Ids Web Components we chose to use Javascript and not TypeScript, however we want to support developers that use typescript. For each component we also include TypeScript declaration files for all methods, settings and events. And we ensure our code if included directly is type safe via. We also created a small [example TypeScript project](https://github.com/infor-design/enterprise-wc-examples/tree/master/typescript-ids-wc) to show one way to use Ids Web Components in a plain typescript project.

## Contributing

- [Contribution Guidelines](docs/CONTRIBUTING.md)
- [Developer Information](docs/DEVELOPER.md)
- Use [Github Issues](https://github.com/infor-design/enterprise/issues) to report all requests, bugs, questions, and feature requests
- [Review source code changes](https://github.com/infor-design/enterprise/pulls)
- [Releases, previous and upcoming](https://github.com/infor-design/enterprise/releases)
- [Microsoft Teams Group](https://teams.microsoft.com/l/team/19%3a2b0c9ce520b0481a9ce115f0ca4a326f%40thread.skype/conversations?groupId=4f50ef7d-e88d-4ccb-98ca-65f26e57fe35&tenantId=457d5685-0467-4d05-b23b-8f817adda47c) (Infor Employees only)
- [Roadmap and Sprint Board](https://github.com/orgs/infor-design/projects)
- Test first - 100% Test Coverage
- Passes all code security scans and is fully CSP compatible
- Well documented in `.md` format
- Contains an extensive [Change log](./doc/CHANGELOG.md) which lists any and all breaking changes
- [Fully linted code](./doc/LINTING.md)
- Follows [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/#keyboard-interaction-12) with a huge focus on accessibility
- Fully Namespaced with an `ids-` namespace
- We Follow the [Gold Standard For Making Web Components](https://github.com/webcomponents/gold-standard/wiki)
- Type safe for TypeScript users
- Every component has the Css and Dom Encapsulated (in supported browsers)
