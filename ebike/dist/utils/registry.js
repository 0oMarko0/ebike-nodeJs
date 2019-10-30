"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Registry {
    static resolve(name) {
        if (this.registry.has(name)) {
            return this.registry.get(name);
        }
    }
    static register(name, service) {
        this.registry.set(name, service);
    }
    static initialise() {
        if (!this.registry) {
            this.registry = new Map();
        }
        return this.registry;
    }
}
exports.default = Registry;
//# sourceMappingURL=registry.js.map