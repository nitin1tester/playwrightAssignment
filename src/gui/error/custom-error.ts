/**
 * Custom Error classes: 
 * inharit Error class & call super() in constructor.
 */

class ElementError extends Error{
    constructor(messsage:string){
        super(messsage);        // call super class constuctor 
    }
};

class BrowserError extends Error{
    constructor(message : string){
        super(message);
    }
};

class FrameworkError extends Error{
    constructor(message : string){
        super(message);
    }
}

class NoDataFoundError extends Error{
    constructor(message : string){
        super(message)
    }
} 
export{ ElementError, BrowserError, FrameworkError, NoDataFoundError};