export class Conf {
    constructor(){}
    private static conf = {
        production: {
            serverPort: 3000,
            nodeEnv: "production",
            dbHost: "127.0.0.1",
            dbPort: 3306,
            dbName: 'dhkim',
            dbUser: 'dh.kim',
            dbPass: 'rlaejrgus12$#'
        },
        development: {
            serverPort: 3000,
            nodeEnv: "development",
            dbHost: "127.0.0.1",
            dbPort: 3306,
            dbName: 'dhkim',
            dbUser: 'dh.kim',
            dbPass: 'rlaejrgus12$#'
        }
    };
    
    public static nodeEnv: string = process.env.NODE_ENV === Conf.conf.production.nodeEnv ? "production" : "development";
    public static serverPort: number = Number(process.env.SERVER_PORT || Conf.conf[Conf.nodeEnv].serverPort);
    public static dbHost: string = process.env.DB_HOST || Conf.conf[Conf.nodeEnv].dbHost;
    public static dbPort: number = Number(process.env.DB_PORT || Conf.conf[Conf.nodeEnv].dbPort);
    public static isProd: boolean = process.env.NODE_ENV === Conf.conf.production.nodeEnv;
    public static dbName: string = process.env.DB_NAME || Conf.conf[Conf.nodeEnv].dbName;
    public static dbUser: string = process.env.DB_USER || Conf.conf[Conf.nodeEnv].dbUser;
    public static dbPass: string = process.env.DB_PASS || Conf.conf[Conf.nodeEnv].dbPass;
}