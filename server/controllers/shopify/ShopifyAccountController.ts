import {BaseController} from "../BaseController";
import {injectable} from "inversify";
import {UnitOfWork} from "../../db/UnitOfWork";
import {IRouterContext} from "koa-router";
import {AppLogger, logger} from "../../util/Logger";

@injectable()
export class ShopifyAccountController extends BaseController {
 // integration = ShopifyIntegrations.Affiliatery
  appLogger: AppLogger = new AppLogger( "ShopifyAccountController");


 // clientId = Configuration.affiliatery.shopify.clientId;
 // clientSecret = Configuration.affiliatery.shopify.clientSecret;
 // requestScopes = ShopifyPermissions.AffiliateryPermissions;
  //clientRepository: AffiliateryClientRepository;

  constructor(private uow: UnitOfWork) {
    super();
  //  this.clientRepository = this.uow.affiliateryClientRepository;
  }


  // async clientOAuth(ctx: IRouterContext) {
  //   let shopUrl = ctx.request.query.shop;
  //
  //   // permission access for roles required.
  //   let requestScopes = this.requestScopes;
  //
  //   let existingClient: AffiliateryClient = await this.clientRepository.getByShopUrl(shopUrl);
  //   // if client already exists , redirect to welcome page
  //   if (existingClient && existingClient.accessToken) {
  //     let cookie = RequestValidator.setShopCookie({
  //       ctx: ctx,
  //       shopifyId: existingClient.shopifyId,
  //       shopUrl: shopUrl,
  //       authRole: AuthRole.ShopOwner,
  //       integration: this.integration
  //     });
  //     // await this.redisLockService.lock(cookie, 1000 * 60 * 2);
  //     return ctx.redirect(this.baseUIURl + this.getUiDestinationPage(existingClient));
  //   } else {
  //     let redirectUrl = `https://${shopUrl}/admin/oauth/authorize?client_id=${this.clientId}&scope=${requestScopes}&redirect_uri=${this.baseApiUrl}/api/client/postSignUp`;
  //     return ctx.redirect(redirectUrl);
  //   }
  // }
  //
  //
  // async getAccessToken(ctx: IRouterContext) {
  //   let code = ctx.request.query.code;
  //   let shopUrl = ctx.request.query.shop;
  //   let existingClient: AffiliateryClient = await this.clientRepository.getByShopUrl(shopUrl);
  //
  //
  //   if (!existingClient) {
  //     let response = await ShopifyService.getAccessToken(shopUrl,
  //       code,
  //       this.clientId,
  //       this.clientSecret);
  //     if (response.status == StatusCode.Ok) {
  //       let accessToken = response.data.access_token;
  //       //   let partneRefId = ctx.cookies.get('ref');
  //       let shopifyService = new ShopifyService(accessToken, shopUrl);
  //       let shopDetails = await shopifyService.getShopDetails();
  //       if (!shopDetails) {
  //         logger.error('error getting shop details from shopify during first time install for shop url', shopUrl);
  //         return this.error(ctx, StatusCode.InternalServerError, "");
  //       }
  //
  //       let client = new AffiliateryClient();
  //       client.accessToken = accessToken;
  //       client.shopUrl = shopUrl;
  //       client.shopifyId = shopDetails.data.shop.id;
  //       client.shopName = shopDetails.data.shop.name;
  //       client.email = shopDetails.data.shop.email;
  //       client.isSetupCompleted = false;
  //       await this.clientRepository.save(client)
  //
  //       let cookie = RequestValidator.setShopCookie({
  //         ctx: ctx,
  //         shopifyId: client.shopifyId,
  //         shopUrl: shopUrl,
  //         authRole: AuthRole.ShopOwner,
  //         integration: this.integration
  //       });
  //       // redirect to app page on admin panel
  //       return ctx.redirect(this.baseUIURl + this.getUiDestinationPage(client));
  //     } else
  //       return this.error(ctx, StatusCode.InternalServerError, "");
  //   } else {
  //
  //     let cookie = RequestValidator.setShopCookie({
  //       ctx: ctx,
  //       shopifyId: existingClient.shopifyId,
  //       shopUrl: shopUrl,
  //       authRole: AuthRole.ShopOwner,
  //       integration: this.integration
  //     });
  //
  //
  //     return ctx.redirect(this.baseUIURl + this.getUiDestinationPage(existingClient));
  //   }
  // }
  //
  // async logout(ctx) {
  //   RequestValidator.setShopCookie({
  //     ctx: ctx,
  //     shopifyId: 0,
  //     shopUrl: '',
  //     authRole: AuthRole.ShopOwner,
  //     integration: this.integration
  //   });
  //   return this.ok(ctx);
  //   //  ctx.redirect(`http://${ctx.state.client.shopUrl}/admin/apps`)
  // }
  //
  // async mandatoryWebhook(ctx) {
  //   let body = ctx.request.body
  //   body = body && JSON.stringify(body);
  //   this.appLogger.info(null, `Received GDPR webhook ${body} Url:${ctx.request.href}`);
  //   return this.ok(ctx);
  // }
  //
  // getUiDestinationPage(client: AffiliateryClient) {
  //   if (client.defaultCommissionRate == 0)
  //     return '/'
  //   return "/";
  // }
}
