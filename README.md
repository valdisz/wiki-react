# General

This is sample application that shows usage of the React, MobX, MUI, Jest of the simple app that fetches *On This Day* from the Wikipedia.


# Structure

App follows `Model -- ViewModel -- View` paradigm.

Dead simple read-only data structures in "plain" *TypeScript* represents the `Model` part.

*MobX* is responsbile for the `ViewModel` part (a.k.a application UI state) and reactive
update of the UI when somehting changes.

*React* represents the `View` part and does not incly any business logic. In this application React just binds to the model and renders
the UI accordingly. Any user input is forwarded to the `ViewModel` part.

Testing is done using *Jest* testing library with the help of `@testing-library/react`.
