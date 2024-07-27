import Cors from 'cors'

interface MiddlewareConfig {
    methods: ['GET' | 'POST' | 'PUT' | 'DELETE'],
    origin: string[],
    allowedHeaders: string[],
    credentials: boolean,
}

export default class ApiHandler {
    constructor(
        private request: Request,
        private response: Response,
        private config: MiddlewareConfig
    ) {
        
    }

    private middleware() {
        return (req: any, res: any) =>
            new Promise((resolve, reject) => {
                Cors(
                    this.config
                )(req, res, (result) => {
                    if (result instanceof Error) {
                        return reject(result)
                    }
                    return resolve(result)
                }
            )
        })
    }
}