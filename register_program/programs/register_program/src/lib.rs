use anchor_lang::prelude::*;

declare_id!("3vmfRWf5EECYFANd2tQqJxrsKyYtb5Da8sAHjLPeLbK1");

#[program]
pub mod register_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, first_name: String, last_name: String, email: String) -> Result<()> {
        let user = &mut ctx.accounts.user;
        user.first_name = first_name;
        user.last_name = last_name;
        user.email = email;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(content: String)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
        init,
        seeds = [b"user", payer.key().as_ref()], 
        bump,                
        payer = payer,
        space = 8 + User::INIT_SPACE
    )]
    pub user: Account<'info, User>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct User {
    #[max_len(50)]
    pub first_name: String, // 4 + length of string in bytes
    #[max_len(50)]
    pub last_name: String, // 4 + length of string in bytes
    #[max_len(50)]
    pub email: String, // 4 + length of string in bytes
    pub bump: u8, // 1 byte
}
