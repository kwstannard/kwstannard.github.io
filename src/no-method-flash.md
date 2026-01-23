# Fixing a Bug in Rails Via Best Practices

## An Error

At a prior job we were had a Rails repo that would run both a web app and an
API app. Thousands of times per day requests would attempt to access web app
routes on the API domain (don't ask) and the API app would attempt to serve
them and fail with the error "NoMethod 'flash' on ActionDispatch::Request".

While we were able to put in a bandage to stem the tide of server errors, the
question as to why Rails was unable to return a 404 or 400 remained. I used
some personal time to give back to Rails and this is a how I fixed the issue.

[Here is a link to the resulting
PR.](https://github.com/rails/rails/pull/43760)

## Encapsulation of Responsibility

The line causing the error is [`request.flash = nil`][3] within the controller
mixin RequestForgeryProtection. `Request#flash` is defined in the Flash mixin,
which is not added when in api only mode.

The problem is that clearing the flash should be the responsibility of the
Flash mixin. The non-flash code should not know how to clear the flash. The
best solution IMO is to have the Flash module overload a method on Request to
have it also clear the flash when it is included. The Flash module already
does this for `reset_session` so the pattern exists to replicate.

But, now there is a new problem. We need to define a method on request to
overload.

## Law of Demeter

The method where the error occurs is [`#handle_unverified_request`][2] and within
it it gets the current request and calls 4 methods on that request object. A
controller calling four methods on a request is a [Law of Demeter][1]
violation. The controller should not know 4 things about the request to
complete an action.

The most likely fix is to move those four things into a method in Request and
call that from the Rails controller. This surfaced that two private classes
that are related to requests were being defined in the controller code and
those should be moved to request code as well.

By looking at the method, the commonality is that it is clearing state with
null objects, so I call the new method `Request#nullify_state`.

Now we have the method that Flash can overload.

## Encapsulation Part 2

Now that we got past the flash issue, we get a new error caused by the
[`self.cookie_jar = NullCookieJar`][4] line. The setter method is coming from the
Cookies mixin, so this is the same type of problem as the flash setter and I
will reach for the same solution.

## Conclusion

After defining another overload of `nullify_state` in the Cookies mixin we
have fixed the issues. We have also created a more cohesive code base.

[1]: https://en.wikipedia.org/wiki/Law_of_Demeter
[2]: https://github.com/rails/rails/pull/43760/files#diff-5f81b06a0e3051b576daee16c960b21e715a6cc26d97d020c546d2fa697c9bc6R184
[3]: https://github.com/rails/rails/pull/43760/files#diff-5f81b06a0e3051b576daee16c960b21e715a6cc26d97d020c546d2fa697c9bc6L188
[4]: https://github.com/rails/rails/pull/43760/files#diff-5f81b06a0e3051b576daee16c960b21e715a6cc26d97d020c546d2fa697c9bc6L190
