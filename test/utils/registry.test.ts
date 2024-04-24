import chai from "chai";
import Registry from "../../src/utils/registry";
import { Injectable } from "../../src/utils/injectable";

const expect = chai.expect;

describe("UTILS Registry initialisation", () => {
    it("should initialise", () => {
        expect(() => {
            Registry.resolve(Injectable.UserController).to.throw();
        });
        Registry.initialise();
        expect(() => {
            Registry.resolve(Injectable.UserController).to.not.throw();
        });
    });
});
