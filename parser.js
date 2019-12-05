exports.parse = (program) => { // parses the program
    return parseExpression(program, []);
}

// an expression can be a bool, word, or number

function parseExpression (program, paramList) {
    program = skipSpace(program);
    let match, expr;

    if (program[0] == "," || program[0] == ".") {
        return parseApply({type: "eol", value: ","}, program.substr(1), paramList);
    }

    var first = program.split(/[\s,.]+/)[0];

    if (first.toLowerCase() == "truth" || first.toLowerCase() == "falsehood") {
        expr = {type: "bool", value: first == "truth" ? true : false};
    } else if (isNaN(first)) {
        expr = {type: "word", value: first}
    } else if (!isNaN(first)) {
        expr = {type: "number", value: parseFloat(first)};
    }

    return parseApply(expr, program.substr(first.length), paramList);

}

function parseApply (expr, rest, paramList) {
    var program = skipSpace(rest);

    if (expr.value == ",") { // uh oh
        return [properApply(paramList), parseExpression(rest, [])];
    }

    if (expr.type == "word" && capital(expr.value)) { // It's a function
        console.log("bru");
        expr.value = simplify(expr.value);
        paramList.push({type: "apply", operator: expr, args:[]})

        if (rest.length <= 1) { // This is the last element in the orignal list, and you can return the evaluation
            return properApply(paramList);
        }

        return parseExpression(rest, paramList)
    } else { // Not a function
        paramList.push(expr);

        if (rest.length <= 1) { // This is the last element in the orignal list, and you can return the evaluation
            return properApply(paramList);
        }

        return parseExpression(rest, paramList);
    }
}

function properApply (paramList) { // turns a list of parameters into a working apply function
    var f;
    var args = [];

    paramList.forEach(e => {
        if (e.type == "apply") {
            f = e;
        } else {
            args.push(e);
        }
    });

    if (f) {
        f.args = args;
        return f;
    } else {
        return paramList;
    }
}

function simplify (str) {
    if (str.endsWith("s")) { // for verb endings like eatS
        return str.substr(0, str.length - 1);
    } else if (str.endsWith("ed")) { // for past tense
        return str.substr(0, str.length - 1);
    }

    return str
}

function skipSpace (str) { // deletes space from the front
    let first = str.search(/\S/);
    return first != -1 ? str.slice(first) : ""
}

function capital (str) {
    return str[0] == str[0].toUpperCase();
}