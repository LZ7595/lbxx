import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(
    ({command, mode}) => {
        let env = loadEnv(mode, process.cwd())
        return {
            plugins: [vue()],
            resolve: {
                alias: {
                    '@': '/src'
                }
            },
            server: {
                port: 5173,
                proxy: {
                    '/api': {
                        target: env.VITE_APP_SERVE,
                        ws: true,
                        changeOrigin: true,
                        rewrite: (path) => path.replace(/^\/api/, '')
                    }
                }
            }
        }
        // resolve: {
        //   alias: {
        //     '@': '/src'
        //   }
        // },
        //
        // server: {
        //   proxy: {
        //     '/api': {
        //       target: 'http://localhost:8080',
        //       ws: true,
        //       changeOrigin: true,
        //       rewrite: (path) => path.replace(/^\/api/, '')
        //     }
        //   }
        // }
    });
