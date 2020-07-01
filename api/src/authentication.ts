import { ServiceAddons, Params } from "@feathersjs/feathers";
import { AuthenticationService, JWTStrategy } from "@feathersjs/authentication";
import { LocalStrategy } from "@feathersjs/authentication-local";
import {
  expressOauth,
  OAuthStrategy,
  OAuthProfile
} from "@feathersjs/authentication-oauth";

import { Application } from "@src/declarations";

declare module "./declarations" {
  interface ServiceTypes {
    authentication: AuthenticationService & ServiceAddons<any>;
  }
}

class GitHubStrategy extends OAuthStrategy {
  async getEntityData(profile: OAuthProfile, existing: any, params: Params) {
    const baseData = await super.getEntityData(profile, existing, params);
    return {
      ...baseData,
      email: profile.email ? profile.email : "",
      bio: profile.bio ? profile.bio.trim() : "",
      avatar: profile.avatar_url ? profile.avatar_url : "",
      name: profile.name ? profile.name : "",
      github: { ...profile }
    };
  }
}

export default function(app: Application) {
  const authentication = new AuthenticationService(app);

  authentication.register("jwt", new JWTStrategy());
  authentication.register("local", new LocalStrategy());
  authentication.register("github", new GitHubStrategy());

  app.use("/authentication", authentication);
  app.configure(expressOauth());
}
