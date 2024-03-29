# english-esolang
An esolang modeled to look like poetry.

# Syntax

a [variable name] : Instantiate a variable. The initial value is set to null.
[variable] is [value] : Set a variable as [value]. Variables need to be instantiated before being set. This is ended with '...'
    We can use these two to write something like [a dog is grey,]

(f) Died [X var] : delete var from memory
(f) Add [Number a] ... : adds the list

(o) [boolean expression] ? [true expression] or [false expression]

NOTES/BEHAVIOUR:

Function calls are ended by punctuation.
    ',' and '.' ends Functions

Primitives:
    boolean: truth, falsehood
    Number: 1, 2, 3, 4.5, etc...
    String: "bob", "orange", etc...

Parameters are separated by "and".
    e.g. "He was Added to the dog"
        "He" is a variable in this context
        "Add" is a function representing "append()"
        "the dog" is a String
        This would evaluate to [He + "the dog"]

Sentence structure doesn't matter
    "Add one and two" is the same as:
    "one Add two"
    "one Added two"
    "one Adds two"
    "two and one Add"
    "two will Add one"
    
    We store everything in a parameter list, so it can be accessed when a function comes

Functions are capitalized. Hyphens are recommended for readability.
    e.g. "Add-The-Numbers one and two", not "add one and two"
    The first example evaluates to 3, with "Add-The-Numbers" defined as a function wrapper for +
        This could also be written as "Add one and two"

everything has to be a function
    like even variables, but they just return their value

    Add one and two, three Take-Away - four Added to three..
        evaluates to
        1 + 2
        3 - (four + three)
