import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:8081',
        viewportWidth: 412,
        viewportHeight: 914,
    },
})
