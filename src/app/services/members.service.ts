import boom from '@hapi/boom';
import { i_member, i_member_auth } from '../interfaces/member.interface';
import { User } from '../database/models/User';
import { Auth } from '../database/models/Auth';

export class members_service {
  async retrieve_user(code: string) {
    const res = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: process.env.CLIENT_ID!,
        client_secret: process.env.CLIENT_SECRET!,
        code,
        grant_type: 'authorization_code',
        redirect_uri: `http://localhost:3000/api/v1/members`,
        scope: 'identify guilds.join',
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const auth = await res.json();
    if (auth.error) throw boom.badRequest(auth.error_description);

    const user = await fetch('https://discord.com/api/users/@me', {
      headers: {
        authorization: `${auth.token_type} ${auth.access_token}`,
      },
    });

    const user_data = await user.json();
    if (user.status !== 200) throw boom.internal('invalid token');

    return { auth, user_data };
  }

  async create_user(user: i_member, auth: i_member_auth) {
    try {
      await User.create({
        _id: user.id,
        username: user.username,
        discriminator: user.discriminator,
        avatar: user.avatar,
        avatar_decoration: user.avatar_decoration,
        bot: user.bot,
        accent_color: user.accent_color,
        system: user.system,
        global_name: user.global_name,
        mfa_enabled: user.mfa_enabled,
        banner: user.banner,
        flags: user.flags,
        premium_type: user.premium_type,
        public_flags: user.public_flags,
        locale: user.locale,
      });

      await Auth.create({
        _id: user.id,
        access_token: auth.access_token,
        refresh_token: auth.refresh_token,
        scope: auth.scope,
        expires_in: auth.expires_in,
        token_type: auth.token_type,
      });

      return;
    } catch (error: any) {
      throw boom.internal(error);
    }
  }

  async check_if_already_exists(_id: string) {
    const user = await User.findOne({ _id: _id });
    if (!user) return false;
    return true;
  }
}
