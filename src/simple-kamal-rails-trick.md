# Kamal, Rails, and Ruby version

Today I have an undocumented trick for those building images with Kamal for
those of you who are, like me, bothered that the ruby version is duplicated in
the Dockerfile and .ruby-version.

## Dockerfile

The default Dockerfile contains the directive:

```
ARG RUBY_VERSION=4.0.1
FROM docker.io/library/ruby:$RUBY_VERSION-slim AS base
```

This allows injection of the Ruby version by setting a docker build-arg option.
If you were to run `docker build` and set `--build-arg RUBY_VERSION` without a
value, docker will get the value from the environment.

## Ruby

When you run Ruby, it sets RUBY_VERSION in it's environment. Any commands run
from within Ruby will get this enviroment variable. Kamal is a Ruby executable,
so it will have the correct RUBY_VERSION for your application.

## deploy.yml

Kamal allow you to set build args in deploy.yml. It even already has a
commented out `RUBY_VERSION: 4.0.1`.

## Connecting the dots

Just uncommenting the line is not enough. Kamal expects the build args to be a
hash, which conflicts with trying to get Kamal to run with `--build-arg
RUBY_VERSION` at first glance. The trick here is a (seemingly) undocumented
feature of Kamal::Utils.argumentize. Any value that gives false to
`VALUE.present?` will result in `--OPTION KEY`, while "present" values result
in `--OPTION KEY=VALUE`.

This means that any of the following will result in passing of RUBY_VERSION
from the Kamal process to the docker build and save you a duplicated config:

```
RUBY_VERSION: ""
RUBY_VERSION: null
RUBY_VERSION: []
RUBY_VERSION: {}
```
