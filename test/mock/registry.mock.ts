import Registry from "../../src/utils/registry";

const resolveMock = jest.fn();
const registerMock = jest.fn();
const initialiseMock = jest.fn(() => {
  return new Map<string, any>();
});

jest.mock("../../src/utils/registry", () => ({
    mock: class {
      static resolve(params: string): any {
        resolveMock(params)
      }

      static register(name: string, service: any): void {
        registerMock(name, service);
      }

      static initialise(): Map<string, any> {
        return initialiseMock();
      }

    }
  })
);

export default registryMock;

