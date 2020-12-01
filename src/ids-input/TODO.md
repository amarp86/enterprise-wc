# TODO - ids-input

## Basic Checks
- [x] Add clearable
- [x] Add auto select on focus
- [x] Add text-align (left, center, right)
- [ ] Add support to validation events
- [x] Fix errors in the console
- [x] Use `ids-input` instead `ids-field`
- [x] The labels are not working (can't click them to focus the field). Tried adding a for and id and this didn't work. So what we should try to add the label in with input.
- [x] Remove `ids-validation-message` component and merge the logic to `ids-validation-mixin`.

```html
<label for="x" />
<input id="x" />
```
- [x] Can we add more complete input styles from current uplift?
- [x] Add tests functional
- [x] Added more functional test for jest coverage
- [x] Add e2e tests
- [x] Fix e2e skipped tests
- [x] Add docs and a typings file(s)

## Dirty Tracker

- [x] Remove property `useTrackdirty`
- [x] Maybe `ids-dirty-tracker` sounds better than `trackdirty`

## Labels

- [x] Rename `ids-label` to `ids-text`

## Trigger Field
- [x] Fix trigger button alignment for all input sizes