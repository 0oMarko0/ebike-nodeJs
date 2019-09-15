import chai from "chai";
import UserController from "../../src/controller/user-controller";
import Registry from "../../src/utils/registry";
import { Injectable } from "../../src/utils/injectable";
import DependencyInjection from "../../src/utils/dependency-injection";

const expect = chai.expect;

jest.mock("../../src/controller/user-controller");
jest.mock("../../src/data/repository/user-repo");
jest.mock("mongodb");
jest.mock("../../src/data/database/mongo");
jest.mock("../../src/utils/registry");

const userControllerMock = UserController as jest.Mocked<typeof UserController>;

describe("UTILS Dependency Injection", () => {
    let di: DependencyInjection;
    describe("Repo", () => {
        beforeEach(() => {
            di = new DependencyInjection();
        });

        it("should resolve a service", () => {
            const resolveMock = jest.fn();
            resolveMock.mockReturnValue(userControllerMock);

            Registry.resolve = resolveMock.bind(Registry);
            di.bootstrap();
            expect(Registry.resolve(Injectable.UserController)).to.be.equal(userControllerMock);
        });
    });
});
