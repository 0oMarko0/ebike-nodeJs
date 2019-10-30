export default class Registry {
    private static registry: Map<string, any>;

    static resolve(name: string): any {
        if (this.registry.has(name)) {
            return this.registry.get(name);
        }
    }

    static register(name: string, service: any): void {
        this.registry.set(name, service);
    }

    static initialise(): Map<string, any> {
        if (!this.registry) {
            this.registry = new Map<string, any>();
        }

        return this.registry;
    }
}
