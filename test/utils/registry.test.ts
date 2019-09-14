import chai from "chai";
import UserController from "../../src/controller/user-controller";
import Registry from "../../src/utils/registry";
import { Injectable } from "../../src/utils/injectable";

const expect = chai.expect;
jest.mock("../../src/controller/user-controller");

const userControllerMock = UserController as jest.Mocked<typeof UserController>;

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

describe("UTILS Registry", () => {
    it("should register and resolve a service", () => {
        Registry.initialise();
        Registry.register(Injectable.UserController, userControllerMock);
        expect(Registry.resolve(Injectable.UserController)).to.be.equal(userControllerMock);
    });
});
