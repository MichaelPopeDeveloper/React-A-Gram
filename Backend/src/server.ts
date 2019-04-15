import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as session from 'express-session';
import * as passport from 'passport';
import * as logger from 'morgan';
import * as path from 'path';
import { userRoute } from './routes/UserRoute';
import { connect } from 'mongoose';

/**
 * The server
 *
 * @class Server
 *
 */
export class Server {
  private port: any = process.env.PORT || 3001;
  public app: express.Application;
  private DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/react-a-gram';

  /**
   * Bootstrap the application.
   * @class Server
   * @method Bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    // create expressjs application.
    this.app = express();

    // configure application.
    this.config();

    // add routes
    this.routes();

    this.listen();

    // add api
    this.api();
  }

  /**
   * Create REST API routes
   *
   * @class Server
   * @method api
   */
  public api() {
    // empty for now
  }

  /**
   * Configure applicationIndexRoute
   *
   * @class Server
   */
  public config() {
    // add static paths
    //  this.app.use(express.static(path.join(__dirname, 'public')));

    // use logger middleware
    this.app.use(logger('dev'));

    // use json form parser middleware
    this.app.use(bodyParser.json());

    // use query string parser middleware
    this.app.use(bodyParser.urlencoded({
      extended: true,
    }));

    this.app.use(
      session({
        secret: 'midoria-shonen',
        resave: false,
        saveUninitialized: false,

        cookie: {
          // httpOnly: true,
          // secure: true,
        }
      }));

    this.app.use(passport.initialize());
    this.app.use(passport.session());

    connect(this.DB_URL, { useNewUrlParser: true })
     .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

    // use cookie parser middleware
    // this.app.use(cookieParser("SECRET_GOES_HERE"));

    // use override middleware
    // this.app.use(methodOverride());

    // catch 404 and forward to error handler
    // this.app.use(function (err: any, req: express.Request,
    // res: express.Response, next: express.NextFunction) {
    //     err.status = 404;
    //     next(err);
    // });

    // error handling
    // this.app.use(errorHandler());
  }

  private listen() {
    this.app.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`);
    });
  }

  /**
   * Create router
   *
   * @class Server
   * @method config
   * @return void
   */
  private routes() {
    // use router middleware
    this.app.use('/user', userRoute);
    // this.app.use('/test', (req, res) => res.send('Go beyond!'));
  }

}
