import {defineConfig} from "orval";

export default defineConfig({
    client: {
        input: './src/shared/api/schema.yaml',
        output: {
            target: './src/shared/api/generate',
            schemas: './src/shared/api/model',
            prettier: true,
            client: 'vue-query',
            mode: 'tags',
            override: {
                mutator: {
                    path: './src/shared/api/api-instance.ts',
                    name: 'createInstance'
                },
            }
        },
    }
});