# General

This is a sample application showing the React, MobX, MUI, and Jest usage in the simple app fetching *On This Day* from Wikipedia.


# Structure

App follows `Model -- ViewModel -- View` paradigm.

Dead simple read-only data structures in "plain" *TypeScript* represents the `Model` part.

*MobX* is responsible for the `ViewModel` part (a.k.a application UI state) and reactive
update the UI when something changes.

*React* represents the `View` part and does not include any business logic. React binds to the model in this application and renders
the UI accordingly and any user input is forwarded to the `ViewModel` part.

Testing is done using *Jest* testing library with the help of `@testing-library/react`.


# How to Run

Execute `yarn start` to launch the development server, and app will be available on then address `http://localhost:3000`

Tests can be executed using `yarn test`. For the coverage run: `yarn test --coverage .`.
