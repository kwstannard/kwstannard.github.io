# ID as a form of primitive obsession

Primitive obsession: the act of utilizing language primitives like strings,
integers, arrays, and such to represent complex domain objects. A common
example of this is representing money with ints or floats. Primitive obsesssion
tends to result in the spread of logic that could be cohessively contained in
one file across the application, repitition of conversion logic through flows,
and many strange hacks that slow comprehension.

A common issue I find across many organizations that is quietly hindering them
is the utilization of identifiers inside of domain logic. Somewhat recently it
hit me that this is a form of primitive obsession. Identifiers are strings or
integers and they represent much larger domain objects, which qualifies them as
a form of primitive obsession. Code that utilizes identifiers is noticably
harder to refactor and usually requires a lot of database accesses.

## How to spot ID obsesssion

Imagine you are working in Rails or an equivalent framework. There is an
interface layer (controllers, workers, etc) that takes external requests
and converts them into domain actions. That conversion layer is the only
place that identifiers should be handled. The identifiers should be converted
to domain objects at that point and all domain logic will utilize those domain
objects.

So, if you happen to see a method on a model instance that utilizes an ID,
then that is incorrect. Instead, pass a model instance to that method.

If you have a service object, that service object should only be handling
models and not identifiers.
